# JRD-test

Twitter API to get trends for places: https://api.twitter.com/1.1/trends/place.json.
Above API returns the trending topics for a specified WOEID.

As per the API,
> "This information is cached for 5 minutes. Requesting more frequently than that will not return any more data, and will count against your rate limit usage".

Hence, it's better to create a file and via cron (*/5 * * * *) update the trends, than hitttin the API on every request.

https://github.com/ttezel/twit - To fetch streams for a specified trend topic

https://github.com/paulmillr/chokidar - To check if trends data has been updated.

http://socket.io/ - To show updates in real-time, without the need to refresh. In our case, it would update trends and tweet-stream.

- [ ] Update trends in real-time without refreshing
- [ ] Show twitter stream when clicked on a trend
- [ ] Limit the stream. Put some control, else tweets would keep on coming, user might not be able to read. See, if speed of streaming the tweets can be controlled