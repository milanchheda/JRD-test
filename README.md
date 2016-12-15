# JRD-test

Twitter API to get trends for places: https://api.twitter.com/1.1/trends/place.json. 
Above API returns the trending topics for a specified WOEID.

As per the API, 
> "This information is cached for 5 minutes. Requesting more frequently than that will not return any more data, and will count against your rate limit usage". 

Hence, it's better to create a file and via cron (*/5 * * * *) update the trends, than hitttin the API on every request.

https://github.com/ttezel/twit - To fetch streams for a specified trend topic

Socket.io for real-time streaming.
