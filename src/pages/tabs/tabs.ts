import { Component } from '@angular/core';


import { FollowsPage } from '../follows/follows';
import { ChatsPage } from '../chats/chats';
import { SettingPage } from '../setting/setting';

import {SharedService} from '../../app/sharedService';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FollowsPage;
  tab2Root: any = ChatsPage;
  tab3Root: any = SettingPage;

  constructor( public ss: SharedService ) {
    ss.stalk.onGlobalMessage(function(data){
      console.log( data );
    });
  }
}