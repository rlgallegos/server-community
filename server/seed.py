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
    Tip.query.delete()
    TipStatistic.query.delete()


    # Seed Tips for Users 1 and 2
    tips = [400, 375, 390, 410, 425, 430, 440]
    for user_id in [1, 2]:
        for i in range(5):  # Add 5 tips for each user
            tip = Tip(
                tip_date=date(2023, 10, 18 - i),
                tip_amount=tips[i],
                day_night="Day",
                user_id=user_id,
            )
            db.session.add(tip)

    # Seed TipStatistics for Restaurants 1 to 10
    for restaurant_id in range(1, 20):
        tip_statistic = TipStatistic(
            day_of_week="Monday",
            day_night="Night",
            role="Bartender",
            average_tip=50.0,
            num_tips=10,
            restaurant_id=restaurant_id,
        )
        db.session.add(tip_statistic)

    # Seed additional TipStatistics for Restaurant 4
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    averages = [159.24, 184.56, 198.12, 222.67, 238.78, 257.23, 284.67]
    for i in range(7):  # Add 3 more tip statistics for Restaurant 4
        tip_statistic = TipStatistic(
            day_of_week=days[i],
            day_night="Day",
            role="Bartender",
            average_tip=averages[i],
            num_tips=i * 4,
            restaurant_id=4,
        )
        db.session.add(tip_statistic)

    # Commit the changes to the database
    db.session.commit()
