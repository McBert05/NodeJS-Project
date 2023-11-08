# State Server!

This is a mound of geospatial data. 
What I need is a server to tell me which state, if any, a point is in.
Some simplified geometries are included in states.json (so greatly simplified,
that some of the smaller ones disappear).

It needs not be fast, but the code should be readable, and the results should be
correct.

## Expected Behavior

  $ ./state-server &
  [1] 21507
  $ curl  -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/
  ["Pennsylvania"]
  $


## Notes

Given that file, it took me about an hour to implement something that
worked correctly. You're welcome to take it however far you want, but I'm
expecting something along those lines. This can be done in any programming language
of your choice -- Python, Java, etc.

And if there's anything special I have to do to run your program, just let me
know. A Makefile never hurt anyone. ;)

