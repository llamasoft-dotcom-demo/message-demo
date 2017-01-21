const Notifications = (function pageNotificationSystem($)
{

    this.msgMap = new Map;
    let summary;
    let summaryLineItems;

    $(document).ready(function(){   
        summary = $('#notification-summary');
        summaryLineItems = $('#notification-summary').find('ul');
    });

    toastr.options = {
        "closeButton": true,    
        "newestOnTop": false,    
        "positionClass": "toast-top-right",
        "preventDuplicates": false,    
        "showDuration": "250",
        "hideDuration": "200",
        "timeOut": "3000",
        "extendedTimeOut": "5",
    };

   function showNotification(msg) {  
      let current = msgMap.get(String(msg)) || {count: 0, id:msgMap.size}; 
      current.count++;     
      msgMap.set(String(msg), current );                      
      toastr.info(`<i class="fa fa-bell" aria-hidden="true"></i> ${msg}`);          
      updateSummaryPanel();    
    }

    function updateSummaryPanel(){        

        if (!summary.is(':visible')){            
            summary.fadeIn();
        }
        for (var [key, value] of msgMap) {
            let el = document.getElementById(value.id)
            if (el == undefined){
                $(summaryLineItems).append(
                        `<li class="list-group-item" id="${value.id}">
                            <span class="badge">${value.count}</span>
                            ${key}
                        </li>`);              
            }
            else
            {
                $(el).find('span.badge').text(value.count);
            }
        }
        
        
    }

    function turnOffNotifications() {        
        msgMap.clear();    
        if (summary.is(':visible')){           
            summary.fadeOut();
        }
        //remove all list items, except the first which is acting as our header
        summary.find('li').nextAll().remove();

    }

    return {
        showNotification: showNotification,        
        turnOffNotifications: turnOffNotifications
    }
})(jQuery);