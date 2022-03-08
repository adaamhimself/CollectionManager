export class Message {
    "_id": String;
    "username": String;
    "other_participant_id": String;
    "messages": [
        {
            "author": String;
            "body": String;
            "timestamp": {
                type: Date;
            }
        }
    ]
}