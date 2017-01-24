/**
 * Created by abrainerd on 7/1/2016.
 * Purpose: Simply makes sure that HTTPS is being used
 */

if (location.protocol == "http:") {
    location.href = location.href.replace("http", "https");
}