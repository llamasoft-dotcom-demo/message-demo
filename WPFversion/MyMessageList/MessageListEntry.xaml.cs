using System.Timers;
using System.Windows;
using System.Windows.Controls;

namespace MyMessageList
{
    /// <summary>
    /// Control for single entry of MessageListBox
    /// </summary>
    public partial class MessageListEntry : UserControl
    {
        public MessageListEntry(string text, MessageListBox listBox)
        {
            InitializeComponent();
            _messageText = text;
            _messageListBox = listBox;
            _timer.Interval = 3000;
            _timer.Elapsed += _timer_Elapsed;
            _timer.Enabled = true;
            _timer.AutoReset = false;
        }

        void _timer_Elapsed( object sender, ElapsedEventArgs e )
        {
            // would like to fade out here, rather than just remove it
            _messageListBox.Remove( this );
        }

        // Reference to parent control
        private MessageListBox _messageListBox;

        // expiration tiemr
        private Timer _timer = new Timer();


        private string _messageText
        { 
            get
            {
                return _textBlock.Text;
            }
            set
            {
                _textBlock.Text = value;
            } 
        }

        /// <summary>
        /// When user clicks button on message, we remove it from the list control
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Button_Click( object sender, RoutedEventArgs e )
        {
            _messageListBox.Remove( this );
        }
    }
}
