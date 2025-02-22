#!/usr/bin/perl -w

use strict;
use warnings;

my @lines = ();

while(<>) {
  s/(navbar.php) \d+\.\d+s/$1 0.0s/;
  s/(server_name=).+(;archive_analytics)/$1'foo'$2/;
  s!(//maps.google.com/.+;ver)=\d+\.\d+\.\d+"!$1=0.0.0"!;
  s!(/wp-emoji-release.min.js\?ver)=\d+\.\d+\.\d+"!$1=0.0.0"!;
  s!(/cookies.js\?ver)=\d+\.\d+\.\d+"!$1=0.0.0"!;
  push @lines, $_;
  next unless m/FILE ARCHIVED ON/;
  pop @lines;
  pop @lines;
  last;
}

foreach(@lines) {
  print $_;
}
