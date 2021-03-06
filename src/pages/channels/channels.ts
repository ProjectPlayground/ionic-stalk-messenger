import { Component } from '@angular/core';

import { Events } from 'ionic-angular';

import { NavController, App } from 'ionic-angular';

import {SharedService} from '../../app/sharedService';

import {NotificationService} from '../../app/notificationService';

import { ChatMenuPage } from '../chat/chatMenu';

import { SearchFollowPage } from '../follows/searchFollow';

@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html'
})
export class ChannelsPage {

  channels:any[] = [];

  constructor(public navCtrl: NavController, public ss: SharedService, private app:App, public ns: NotificationService, public events: Events ) {
  }

  public gotoChat = (channel) => {
    this.app.getRootNav().push(ChatMenuPage, {channelId:channel.channelId, users:channel.users});
  }

  ionViewDidEnter() {
    var self = this;
    this.ss.stalk.loadChannels( function(err, channels){

      self.channels = channels;

      self.ns.clearNotification();
      self.events.publish('message:unread', {});
    });
  }

  public unreadCount(channelId): number {
    return this.ss.getUnreadCount(channelId);
  }

  public latestMessage(channelId): string {
    return this.ss.getLatestMessage(channelId);
  }

  public openSearchFollow = () => {
    this.navCtrl.push(SearchFollowPage, {callback:this.createChannel, mode:"Select"});
  }

  public createChannel = (userIds, users) => {
    var self = this;
    this.app.getRootNav().push(ChatMenuPage, {users:users});
  };
}