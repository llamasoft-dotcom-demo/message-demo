using System.Windows.Controls;
using System;
using System.ComponentModel;
using System.Collections;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Threading;

namespace MyMessageList
{
    /// <summary>
    /// Control to display non-obtrusive messages to teh user
    /// </summary>
    public partial class MessageListBox : UserControl
    {
        #region ViewModelProperty: Message
        private List<MessageListEntry> _xyzzy = new List<MessageListEntry>();

        public List<MessageListEntry> Xyzzy
        {
            get
            {
                return _xyzzy;
            }

            set
            {
                _xyzzy = value;
            }
        }
        #endregion

        public MessageListBox()
        {
            InitializeComponent();
            DataContext = this;
        }

        public void Add( string msg )
        {
            Application.Current.Dispatcher.Invoke( (Action) delegate
            {
                _xyzzy.Add( new MessageListEntry( msg , this ));

            } );

            Dispatcher.BeginInvoke( new Action( this.RefreshList ), DispatcherPriority.Background );
        }

        public void Remove( MessageListEntry entry )
        {
            if (_xyzzy.Contains( entry ))
            {
                _xyzzy.Remove( entry );
                
                Dispatcher.BeginInvoke( new Action( this.RefreshList ), DispatcherPriority.Background );
            }
        }

        private void RefreshList()
        {
            _listBox.Items.Refresh();
        }

    }
}
