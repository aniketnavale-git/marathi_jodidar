import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, Appbar, TextInput, Badge, Divider, TouchableRipple, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { primaryColor, accentColor } from '../theme/theme';
import { dummyProfiles, Profile } from '../data/dummyData';

interface ChatThread {
  id: string;
  profile: Profile;
  lastMessageMr: string;
  lastMessageEn: string;
  timestampMr: string;
  timestampEn: string;
  unreadCount: number;
  isOnline: boolean;
}

const sampleChats: ChatThread[] = [
  {
    id: 'c1',
    profile: dummyProfiles[0], // Sneha Sawant
    lastMessageMr: 'नमस्कार! तुमची प्रोफाइल खूप छान वाटली.',
    lastMessageEn: 'Namaskar! Found your profile really interesting.',
    timestampMr: '१०:३० AM',
    timestampEn: '10:30 AM',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 'c2',
    profile: dummyProfiles[1], // Pooja Kulkarni
    lastMessageMr: 'हो, नक्कीच. रविवारी बोलूया का?',
    lastMessageEn: 'Sure, can we speak this Sunday?',
    timestampMr: 'काल',
    timestampEn: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 'c3',
    profile: dummyProfiles[2], // Anjali Patil
    lastMessageMr: 'तुमचा बायोडाटा वाचला, कौटुंबिक माहिती छान आहे.',
    lastMessageEn: 'Read your biodata, loved the family background.',
    timestampMr: '२ दिवस आधी',
    timestampEn: '2 days ago',
    unreadCount: 0,
    isOnline: true,
  },
];

export const ChatScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeChat, setActiveChat] = useState<ChatThread | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{ id: string; text: string; isMe: boolean; time: string }>>([
    { id: 'm1', text: 'नमस्कार!', isMe: false, time: '१०:२८ AM' },
    { id: 'm2', text: 'नमस्कार! कसे आहात?', isMe: true, time: '१०:२९ AM' },
    { id: 'm3', text: 'तुमची प्रोफाइल खूप छान वाटली.', isMe: false, time: '१०:३० AM' },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const filteredChats = sampleChats.filter((item) => {
    const name = (language === 'mr' ? item.profile.marathiName : item.profile.name) || item.profile.name;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return name.toLowerCase().includes(q) || item.profile.location.toLowerCase().includes(q);
  });

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      text: chatMessage.trim(),
      isMe: true,
      time: language === 'mr' ? 'आत्ता' : 'Just now',
    };
    setConversation((prev) => [...prev, newMsg]);
    setChatMessage('');
  };

  const renderChatItem = ({ item }: { item: ChatThread }) => {
    const displayName = language === 'mr' ? (item.profile.marathiName || item.profile.name) : item.profile.name;
    const lastMsg = language === 'mr' ? item.lastMessageMr : item.lastMessageEn;
    const timeText = language === 'mr' ? item.timestampMr : item.timestampEn;

    return (
      <TouchableRipple
        style={styles.chatCard}
        onPress={() => setActiveChat(item)}
        rippleColor="rgba(144, 28, 96, 0.1)"
      >
        <View style={styles.chatRow}>
          {/* Avatar with Online Badge */}
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: item.profile.imageUrl }} style={styles.avatar} />
            {item.isOnline && <View style={styles.onlineDot} />}
          </View>

          {/* Chat Details */}
          <View style={styles.chatInfo}>
            <View style={styles.nameTimeRow}>
              <View style={styles.nameWithBadge}>
                <Text style={styles.nameText} numberOfLines={1}>{displayName}</Text>
                {item.profile.isVerified && (
                  <MaterialCommunityIcons name="check-decagram" size={15} color="#2e7d32" style={{ marginLeft: 4 }} />
                )}
              </View>
              <Text style={styles.timeText}>{timeText}</Text>
            </View>

            <View style={styles.msgRow}>
              <Text style={[styles.lastMsgText, item.unreadCount > 0 && styles.lastMsgUnread]} numberOfLines={1}>
                {lastMsg}
              </Text>
              {item.unreadCount > 0 && (
                <Badge style={styles.badge} size={20}>{item.unreadCount}</Badge>
              )}
            </View>
          </View>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <Appbar.Header style={{ backgroundColor: primaryColor, elevation: 0 }}>
        <Appbar.Content
          title={
            <View>
              <Text style={styles.headerTitle}>{t('chatTitle')}</Text>
              <Text style={styles.headerSubtitle}>{t('chatSubtitle')}</Text>
            </View>
          }
        />
      </Appbar.Header>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={t('search')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          mode="outlined"
          style={styles.searchInput}
          outlineStyle={styles.searchOutline}
          left={<TextInput.Icon icon="magnify" color="#888" />}
          right={
            searchQuery.length > 0 ? (
              <TextInput.Icon icon="close-circle" color="#888" onPress={() => setSearchQuery('')} />
            ) : null
          }
          theme={{ colors: { primary: primaryColor } }}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#eeeeee' }} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: 80 + insets.bottom }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[primaryColor]} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="chat-outline" size={64} color="#cccccc" />
            <Text style={styles.emptyTitle}>{t('noChatsTitle')}</Text>
            <Text style={styles.emptySubtitle}>{t('noChatsSubtitle')}</Text>
          </View>
        }
      />

      {/* Interactive Chat Conversation Modal */}
      {activeChat && (
        <Modal
          visible={!!activeChat}
          animationType="slide"
          onRequestClose={() => setActiveChat(null)}
        >
          <View style={{ flex: 1, backgroundColor: '#f4f4f6' }}>
            <StatusBar style="light" />
            <Appbar.Header style={{ backgroundColor: primaryColor }}>
              <Appbar.BackAction color="#ffffff" onPress={() => setActiveChat(null)} />
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                onPress={() => {
                  setActiveChat(null);
                  navigation.navigate('ProfileDetails', { profile: activeChat.profile });
                }}
              >
                <Image source={{ uri: activeChat.profile.imageUrl }} style={styles.modalAvatar} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
                    {language === 'mr' ? (activeChat.profile.marathiName || activeChat.profile.name) : activeChat.profile.name}
                  </Text>
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                    {activeChat.isOnline ? t('onlineNow') : (language === 'mr' ? activeChat.profile.caste : activeChat.profile.profession)}
                  </Text>
                </View>
              </TouchableOpacity>
              <Appbar.Action
                icon="account-box-outline"
                color="#ffffff"
                onPress={() => {
                  setActiveChat(null);
                  navigation.navigate('ProfileDetails', { profile: activeChat.profile });
                }}
              />
            </Appbar.Header>

            {/* Conversation Messages */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ flex: 1 }}
            >
              <FlatList
                data={conversation}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                renderItem={({ item }) => (
                  <View
                    style={[
                      styles.msgBubble,
                      item.isMe ? styles.msgBubbleMe : styles.msgBubbleThem,
                    ]}
                  >
                    <Text style={[styles.msgText, item.isMe ? styles.msgTextMe : styles.msgTextThem]}>
                      {item.text}
                    </Text>
                    <Text style={[styles.msgTime, item.isMe ? styles.msgTimeMe : styles.msgTimeThem]}>
                      {item.time}
                    </Text>
                  </View>
                )}
              />

              {/* Message Input Bar */}
              <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
                <TextInput
                  placeholder={t('typeMessage')}
                  value={chatMessage}
                  onChangeText={setChatMessage}
                  mode="outlined"
                  style={styles.chatInput}
                  outlineStyle={{ borderRadius: 24, borderColor: '#d0d0d0' }}
                  theme={{ colors: { primary: primaryColor } }}
                />
                <IconButton
                  icon="send"
                  mode="contained"
                  containerColor={primaryColor}
                  iconColor="#ffffff"
                  size={24}
                  onPress={handleSendMessage}
                  style={{ marginLeft: 8 }}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f6',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    height: 48,
  },
  searchOutline: {
    borderRadius: 8,
    borderColor: '#d0d0d0',
  },
  listContent: {
    backgroundColor: '#ffffff',
  },
  chatCard: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e0e0e0',
  },
  onlineDot: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4caf50',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 14,
  },
  nameTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  timeText: {
    fontSize: 12,
    color: '#888888',
  },
  msgRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMsgText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    marginRight: 8,
  },
  lastMsgUnread: {
    fontWeight: 'bold',
    color: '#111111',
  },
  badge: {
    backgroundColor: primaryColor,
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444444',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginTop: 6,
  },
  modalAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
  },
  msgBubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 10,
  },
  msgBubbleMe: {
    alignSelf: 'flex-end',
    backgroundColor: primaryColor,
    borderBottomRightRadius: 4,
  },
  msgBubbleThem: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  msgText: {
    fontSize: 15,
  },
  msgTextMe: {
    color: '#ffffff',
  },
  msgTextThem: {
    color: '#222222',
  },
  msgTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  msgTimeMe: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  msgTimeThem: {
    color: '#888888',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: 46,
    fontSize: 15,
  },
});

export default ChatScreen;
