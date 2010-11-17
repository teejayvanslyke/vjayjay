#!/usr/bin/env rackup -Ilib:../lib -s thin

require File.dirname(__FILE__) + '/lib/application'

run Application.new
