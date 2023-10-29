from helpers import get_shift_counts




def should_user_drop_shifts(shift_counts, rest_stats):
    # Find the shifts with the lowest average tips based on restaurant stats
    worst_shifts = sorted([(day, shift, value) for day, shifts in rest_stats.items() for shift, value in shifts.items()], key=lambda x: x[2])
    if len(worst_shifts) >= 5:
        worst_shifts = worst_shifts[:5]

    user_worst_shifts = [shift for shift in worst_shifts if shift_counts[shift[0]][shift[1]] >= 2]

    if not user_worst_shifts:
        return None
    else:
        return(
        {
            "role": "system",
            "content": "These are the shifts that the user works that are amongst the top 5 worst shifts: {}. It would be advisable for the user to drop or trade these shifts.".format(user_worst_shifts)
        }
        )

def should_user_get_shifts(shift_counts, rest_stats):
    best_shifts = sorted([(day, shift, value) for day, shifts in rest_stats.items() for shift, value in shifts.items()], key=lambda x: x[2])
    if len(best_shifts) >= 5:
        best_shifts = best_shifts[-4:]

    missing_best_shifts = [shift for shift in best_shifts if shift_counts[shift[0]][shift[1]] == 0]
    if not missing_best_shifts:
        return None
    else:
        return(
        {
            "role": "system",
            "content": "These are the shifts that the user does not work and what the average for an employee to make on that shift is but should that are amongst the top 5 best shifts: {}. It would be advisable for the user to try to pick up / trade for these shifts.".format(missing_best_shifts)
        }
        )


def where_is_user_below_or_above_average(tip_averages, rest_averages):
    shift_times = ['Day', 'Night']
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    shifts_below_average = []
    shifts_above_average = []
    for day in days:
        for shift in shift_times:
            tip_avg, rest_avg = tip_averages[day][shift], rest_averages[day][shift]
            if not tip_avg or not rest_avg:
                continue
            percentage_difference = (tip_avg - rest_avg) / rest_avg 
            percentage_difference = "{:.0%}".format(abs(percentage_difference))
            if tip_avg > rest_avg * 1.25:
                shifts_above_average.append((day, shift, tip_avg, rest_avg, percentage_difference))
            elif tip_avg < rest_avg * 0.75:
                shifts_below_average.append((day, shift, tip_avg, rest_avg, percentage_difference))


    below_messages = []
    above_messages = []

    for day, shift, tip_avg, rest_avg, percentage in shifts_above_average:
        message = {
            "role": "system",
            "content": "The user's {} shift on {} has an average of ${}, which is {} above the restaurant's average for that shift: ${}. Congradulate the user.".format(
                shift, day, tip_avg, percentage, rest_avg
            )
        }
        above_messages.append(message)
    for day, shift, tip_avg, rest_avg, percentage in shifts_below_average:
        message = {
            "role": "system",
            "content": "The user's {} shift on {} has an average of ${}, which is {} below the restaurant's average for that shift: ${}. Encourage the user.".format(
                shift, day, tip_avg, percentage, rest_avg
            )
        }
        below_messages.append(message)
    return (below_messages, above_messages)






# Balance Workload: Ensure a balanced workload across shifts to maintain consistency in your tip earnings. 
# Avoid overloading on low-earning shifts.

# Shift Swapping: Explore opportunities for shift swaps with colleagues to potentially work on more lucrative shifts.

# Performance Consistency: Strive for consistent performance across all shifts by maintaining high service quality 
# and attentiveness.

# Track Shift Data: Continuously track and analyze your performance data on different shifts to identify trends 
# and areas for improvement.


# Working on Low-Earning Days: If the user consistently works on days with historically lower average tips, 
# it can impact their earnings. For example, if they work on a slow Tuesday night when tips are generally lower.

# Inconsistent Schedule: Having an inconsistent work schedule can affect the user's ability to build rapport 
# with regular customers. Consistency can lead to more returning customers who might tip better.

# Below Average Performance on Specific Days: If the user's performance (service quality, attentiveness, speed, etc.) 
# is below average on certain days, it can lead to lower tips. For example, 
# if they provide subpar service on a typically high-earning Saturday night.

# Time of Day: Customers tend to tip differently during the day and night. 
# The user's performance during these shifts may vary, affecting their earnings.