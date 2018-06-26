import re
 
email_regex = re.compile(r"^[\w!#$%&'*+/=?^_`{|}~-]+@([\w\-]+(?:\.[\w\-]+)+)$")
 
def domain_from_email(test):
	match = email_regex.match(test)
	if match is not None:
		return match.group(1)
	else:
		return False
 
print(domain_from_email("sam@bbc.co.uk")) # bbc.co.uk