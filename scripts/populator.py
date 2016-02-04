import os
import random
from pymongo import MongoClient
from datetime import datetime
from datetime import timedelta
import pprint


client = MongoClient('mongodb://patrick:olinjs@ds055515.mongolab.com:55515/burger')
db = client.get_default_database()

ingredient_coll = db['Ingredient']

item_names = ['Tomato', 'Pear', 'Patty', 'Ketchup', 'Mushroom', 'Mustard', 'Bun', 'Wood Chips', 'Bark', 'Termites', 'Chicken', 'Lettuce']

for name in item_names:
	ingredient = {}
	ingredient['name'] = name
	ingredient['quantity'] = random.randint(20,50)
	ingredient['cost'] = random.randint(2,50)/10.0

	ingredient_coll.insert(ingredient)

	pprint.pprint(ingredient)