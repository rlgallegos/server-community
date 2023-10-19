from models import User, Restaurant, Tip, TipStatistic
from app import app, db
from datetime import date, time

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


    # Seed Tips for Users 1 and 2
    for user_id in [1, 2]:
        for i in range(5):  # Add 5 tips for each user
            tip = Tip(
                tip_date=date(2023, 10, 18),
                tip_time=time(12, 0, 0),
                day_night="Day",
                role="Some Role",
                user_id=user_id,
            )
            db.session.add(tip)

    # Seed TipStatistics for Restaurants 1 to 10
    for restaurant_id in range(1, 20):
        tip_statistic = TipStatistic(
            day_of_week="Monday",
            day_night="Night",
            role="Some Role",
            average_tip=50.0,
            num_tips=10,
            restaurant_id=restaurant_id,
        )
        db.session.add(tip_statistic)

    # Seed additional TipStatistics for Restaurant 4
    for i in range(3):  # Add 3 more tip statistics for Restaurant 4
        tip_statistic = TipStatistic(
            day_of_week="Tuesday",
            day_night="Day",
            role="Some Other Role",
            average_tip=60.0,
            num_tips=15,
            restaurant_id=4,
        )
        db.session.add(tip_statistic)

    # Commit the changes to the database
    db.session.commit()
