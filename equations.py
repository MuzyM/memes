#main.py
#!/usr/bin/python
# -*- coding: utf-8 -*-

from sympy.solvers import solve
from sympy import Symbol
import sys
import logging 


logging.basicConfig(format = u"{time: '%(asctime)s', levelname: '%(levelname)s', message: '%(message)s'}", level = logging.DEBUG, datefmt = '%d.%m.%Y', filename = u'%(filename)s.log')

print(sys.argv[0])
try:
   f = open(sys.argv[1])
except OSError:
   logging.error( u'Error while opening the file' )
   sys.exit();
    
for line in f:
   for i in range(len(line)):
      if line[i] == '^':
         line = line[:i] + '**' + line[i+1:]
      if isalpha(line[i]):
         x = Symbol(line[i])
   solved = solve(line, x)
   logging.debug( u'equation: %s, result: %s ' % (line, solved) )
