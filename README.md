# Message Exercise

### Added features
1) Layout has been updated with Bootstrap for a better overall look and feel.

2) Notifications were achieved using the [Toastr](http://codeseven.github.io/toastr/) Javascript framework. It implements Growl-type notifications, with options for timeout and close buttons. Timeout was set to 3 seconds. When a new notification appears before the previous one's timeout, it slots in below, moving up after the exit of the older message(s).

3) The "Start Messages" button now gives an indication of its current status through a stationary (when stopped) or spinning (when running) cog. It is green to indicate that clicking it will start the system, and red when clicking it will stop the system.

4) Just to pretty things up a bit, the instructions have been moved to a collapsible panel accessed through an "Original Instructions" button.

### Known issues
1) The only known issue so far is that the instructions, when expanded, can mix in with the footer, making them both difficult to read.
