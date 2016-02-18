using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Timers;
using System.Diagnostics;

namespace llama_message_csharp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            timer = new Timer( NextMessageMilliseconds() );
            timer.Elapsed += timer_Elapsed;
            timer.Enabled = false;
            timer.AutoReset = true;
        }

        void timer_Elapsed( object sender, ElapsedEventArgs e )
        {
            timer.Interval = NextMessageMilliseconds();
            timer.Enabled = false;

            string clever = CleverMessage();

            myMsgList.Add( clever );
            timer.Enabled = true;
           
        }


        private void Button_Click( object sender, RoutedEventArgs e )
        {
            if (LLmsgButton.Content.ToString() == "Start Messages")
            {
                LLmsgButton.Content = "Stop Messages";
                timer.Enabled = true;
            }
            else
            {
                LLmsgButton.Content = "Start Messages";
                timer.Enabled = false;
            }
        }

        int NextMessageMilliseconds()
        {
            return randy.Next( 500, 3000 );
        }

        string CleverMessage()
        {
            int size = CleverMessageList.Count;
            int choice = randy.Next( 0, size - 1 );
            return CleverMessageList[choice];
        }

        List<string> CleverMessageList = new List<string>()
        {
            "What we've got here is failure to communicate.",
            "Go ahead, make my day.",
            "I've got a bad feeling about this.",
            "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
            "I find your lack of faith disturbing.",
            "You're gonna need a bigger boat.",
            "Tell Mike it was only business.",
            "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum."
        };

        private Timer timer;
        private Random randy = new Random();


    }
}
