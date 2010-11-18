require 'rubygems'
require 'eventmachine'
require 'em-websocket'
require 'coremidi'
require 'json'

module Vjayjay

  class Daemon

    class << self
      attr_reader :observers

      def start(options={})
        @observers = []

        options[:host] ||= "0.0.0.0"
        options[:port] ||= 8080
        options[:midi_port] ||= "Vjayjay"

        start_listening_to_midi(options[:midi_port])
        EventMachine.run do

          puts "Vjayjay is running at #{options[:host]} on port #{options[:port]}."
          EventMachine::WebSocket.start(options) do |ws|
            ws.onopen do
              puts "Vjayjay just got spread wide open by a browser somewhere."
              @observers << ws
            end

            ws.onclose do 
              puts "Vjayjay's job here is done. Back to the kitchen."
              @observers.delete(ws)
            end
          end
        end
      end

      def start_listening_to_midi(midi_port)
        midi_thread = Thread.new do 
          client = CoreMIDI::API.create_client("Vjayjay") 
          port = CoreMIDI::API.create_input_port(client, "Vjayjay")
          CoreMIDI::API.connect_source_to_port(CoreMIDI::API.get_sources.index(midi_port), port)

          while true
            data = CoreMIDI::API.check_for_new_data
            if data && !data.empty?
              data.each do |packet|
                event = CoreMIDI::Packet.parse(packet.data)
                message = JSON.dump({ :type => event.class.to_s.split('::').last, 
                                    :channel => event.channel,
                                    :pitch => event.pitch,
                                    :velocity => event.velocity
                })

                observers.each {|o| o.send message }
              end
            end
            sleep 0.001
          end
        end
      end
    end
  end
end
