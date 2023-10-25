import os
import requests
import imghdr 
import json
from datetime import datetime



# Imgur Fetches
def save_to_imgur(id, file, prev_del_hash):

    # Delete previous picture from Imgur
    if prev_del_hash:
        delete_res = delete_from_imgur(prev_del_hash)
        if not delete_res:
            return make_response({'error': 'Failed to delete previous picture'}, 422)

    imgur_client_id = os.environ.get('IMGUR_CLIENT_ID')
    image_format = 'jpg' if imghdr.what(None, h=file) == 'jpeg' else 'png'

    id_string = str(id)

    form_data = {
        'type': 'file',
        'image': file,
        'name': f'user_{id_string}_profile_picture.{image_format}'
    }

    headers = {
        'Authorization': f'Client-ID {imgur_client_id}'
    }

    response = requests.post('https://api.imgur.com/3/image', headers=headers, data=form_data)
    imgur_response = response.json()

    if imgur_response['status'] == 200:
        imgur_image_url = imgur_response['data']['link']
        imgur_delete_hash = imgur_response['data']['deletehash']
        return (imgur_image_url, imgur_delete_hash)
    else:
        return ('', '')

def delete_from_imgur(del_hash):
    imgur_client_id = os.environ.get('IMGUR_CLIENT_ID')
    headers = {
        'Authorization': f'Client-ID {imgur_client_id}'
    }
    response = requests.delete(f'https://api.imgur.com/3/image/{del_hash}', headers=headers)
    imgur_response = response.json()

    if imgur_response['status'] == 200:
        return True
    else:
        return False



# Converting Redis Messages to Correct Format

def convert_messages_format(string_messages):
    messages = [convert_single_message_format(s_message) for s_message in string_messages]
    return messages

def convert_single_message_format(string_message):
    json_message = json.loads(string_message)
    dt_object = datetime.fromtimestamp(json_message['timeStamp'])
    json_message['timeStamp'] = dt_object.strftime("%A %m/%d %I:%M %p")
    return json_message

# Converts one data object returned from POST to match others from GET requests
def convert_data(data):
    dt_object = datetime.fromtimestamp(data['timeStamp'])
    data['timeStamp'] = dt_object.strftime("%A %m/%d %I:%M %p")
    return data


# ChatGPT Data Converstion Functions

def convert_restaurant_statistics(original_data):
    # Initialize an empty dictionary to store the transformed data
    data = {}

    # Loop through the original data and populate the 'data' dictionary
    for item in original_data:
        day = item['day_of_week']
        day_night = item['day_night']
        average_tip = item['average_tip']
        
        # Create the day entry if it doesn't exist
        if day not in data:
            data[day] = {}
        
        # Populate the 'data' dictionary
        data[day][day_night] = average_tip

    return data

def convert_tips_to_averages(original_data):
    shift_times = ['Day', 'Night']
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    # Initialize an empty dictionary
    data = {}

    # Loop through each day of the week and each shift
    for day in days:
        for shift in shift_times:
            # Initialize daily data for each shift
            data[day] = data.get(day, {})
            data[day][shift] = []
    # print()
    # print('data before filling', data)

    # Fill in the data dictionary
    for item in original_data:
        day = item['day_of_week']
        shift = item['day_night']
        tip_amount = item['tip_amount']
        data[day][shift].append(tip_amount)
    # print()
    # print('data after filling it in', data)

    # Calculate averages
    averages = {}
    for day, shifts in data.items():
        averages[day] = {}
        for shift, tips in shifts.items():
            if tips:  # Check if there are tips for the shift
                avg = sum(tips) / len(tips)
                averages[day][shift] = avg
            else:
                averages[day][shift] = None 
    # print()
    # print('averages, what is returned', averages)

    return averages

def get_shift_counts(original_data):
    shift_times = ['Day', 'Night']
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    # Initialize an empty dictionary
    data = {}

    # Loop through each day of the week and each shift
    for day in days:
        for shift in shift_times:
            # Initialize daily data for each shift
            data[day] = data.get(day, {})
            data[day][shift] = 0
        
    for item in original_data:
        day = item['day_of_week']
        shift = item['day_night']
        data[day][shift] += 1

    return data
