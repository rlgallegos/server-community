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
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    # Seed Tips for Users 1 and 2
    # First Two Weeks
    tips = [332, 315, 360, 210, 235, 130, 340, 400, 375, 390, 410, 425, 430, 440]
    for user_id in [1, 2]:
        for i in range(14):
            if i == 2 or i == 4 or i == 9 or i == 11:
                continue
            tip = Tip(
                tip_date=date(2023, 10, 15 - i),
                tip_amount=tips[i],
                day_of_week=days[i],
                day_night="Day" if i < 7 else "Night",
                user_id=user_id,
            )
            db.session.add(tip)
    # Second Two Weeks
    tips2 = [200, 175, 290, 310, 225, 430, 465, 265, 372, 319, 430, 415, 385, 540]
    for user_id in [1, 2]:
        for i in range(14):
            if i == 2 or i == 4 or i == 9 or i == 11:
                continue
            tip = Tip(
                tip_date=date(2023, 10, 31 - i),
                tip_amount=tips2[i],
                day_of_week=days[i],
                day_night="Day" if i < 7 else "Night",
                user_id=user_id,
            )
            db.session.add(tip)

    # Seed TipStatistics for Restaurants 1 to 10
    for restaurant_id in range(1, 20):
        if restaurant_id == 4:
            continue
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
    averages = [359.24, 184.56, 398.12, 222.67, 218.78, 257.23, 384.67, 218.48, 369.12, 196.24, 245.34, 277.56, 514.46, 569.34]
    for i in range(14):  # Add 3 more tip statistics for Restaurant 4
        tip_statistic = TipStatistic(
            day_of_week=days[i],
            day_night="Day" if i < 7 else "Night",
            role="Bartender",
            average_tip=averages[i],
            num_tips=i * 4,
            restaurant_id=4,
        )
        db.session.add(tip_statistic)

    # Commit the changes to the database
    db.session.commit()
