from models import User, Restaurant
from app import app, db

with app.app_context():
    # restaurant_names = [
    #     "The Hungry Panda",
    #     "Cafe Italia",
    #     "Sushi Palace",
    #     "Burger Haven",
    #     "Pizza Paradise",
    #     "Taco Fiesta",
    #     "Mama's Kitchen",
    #     "Golden Dragon",
    #     "The Green Leaf",
    #     "Deli Delight",
    #     "Spice World",
    #     "Noodle Express",
    #     "The BBQ Pit",
    #     "Seafood Sensation",
    #     "La Patisserie",
    #     "Pancake Palace",
    #     "The Veggie Patch",
    #     "Steakhouse Grill",
    #     "Bakery Bliss",
    #     "Smoothie Oasis",
    # ]

    # Restaurant.query.delete()

    # restaurants = [Restaurant(name=name) for name in restaurant_names]
    # db.session.add_all(restaurants)
    # db.session.commit()

    robert = User.query.filter(User.id == 1).first()
    robert.imgur_delete_hash = '4QbC71HqeYVcZeY'
    db.session.add(robert)
    db.session.commit()