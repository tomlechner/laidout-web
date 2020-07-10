Work area for Laidout's website (laidout.org)
=============================================

To update roadmap:
 - update `laidout/ROADMAP`
 - `cd laidout-web/generators`
 - `./convertroadmap.pl`
 - `git commit` and push

To update DTP comparison:
 - Make sure `generators/laxkit` is the Laxkit repo
 - Compile `generators/dtpcompare`: `cd generators && make`
 - `./dtpcompare > ../dtpcomparison.html`



Licenses
--------

js/jquery\* and js/lightbox\* are under their own licenses.
generators/\* is under GPL v3.
Everything else is licensed under CC-by-sa.
