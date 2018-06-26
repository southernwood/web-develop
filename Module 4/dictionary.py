first_name, last_name = ("John", "Smith")
fruits_in_bowl = {
	'apple': 4,
	'banana': 2,
	'cherry': 0,
	'date': 12
}
 
for fruit, num in fruits_in_bowl.items():
	print "There are %d %s(s) in the bowl." % (num, fruit)