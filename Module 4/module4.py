class player:
	name=''
	bat = 0.0
	hit =0.0
	run =0.0
	rate =0.0
	

import sys, os,re


if len(sys.argv)<2:
	sys.exit("Usage: %s filename"%sys.argv[0])
filename = sys.argv[1]
if not os.path.exists(filename):
	sys.exit("Error: File '%s' not found" %sys.argv[1])

f= open(filename)
s=[]
keywords="(?P<name>((\w+).)+)batted.(?P<bat_time>(\d+)).times.with.(?P<hit_time>(\d+)).hits.and.(?P<run_time>(\d+)).(\w+)."
keywords2 = re.compile(keywords)

for line in f:
	r=keywords2.search(line)
	if r!=None:
		#print "%s : "%(r.group('name'))
		flag = False
		for i in range(len(s)):
			if r.group('name')==s[i].name:
				flag= True
				break
		if flag==True:
				s[i].bat=s[i].bat+int(r.group('bat_time'))
				s[i].hit=s[i].hit+int(r.group('hit_time'))
				s[i].run=s[i].run+int(r.group('run_time'))
		else:
			s1 = player()
			s1.name=r.group('name')
			s1.bat=int(r.group('bat_time'))
			s1.hit=int(r.group('hit_time'))
			s1.run=int(r.group('run_time'))
			s.append(s1)
			#print "%s : "%(s1.name)
				
f.close

for i in range(len(s)):
	s[i].rate = float(s[i].hit)/float(s[i].bat)
	#print "%s :%.3f "%(s[i].name,s[i].rate)
	
s.sort(key=lambda player: player.rate, reverse=True)
for i in range(len(s)):
        print "%s :%.3f "%(s[i].name,s[i].rate)