print "Hello World"
 
fruits = ["apple", "banana", "cherry", "date"]
for fruit in fruits:
	print "I always love to eat a fresh %s." % fruit
 
# Map the fruits list over to a new list containing the length of the fruit strings:
fruit_size = [len(fruit) for fruit in fruits]
 
avg_fruit_size = sum(fruit_size) / float(len(fruit_size))
print "The average fruit string length is %4.2f." % avg_fruit_size