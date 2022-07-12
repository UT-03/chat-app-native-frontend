import { Pressable, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GlobalStyles from '../Constants/style/GlobalStyles';

const SendButton = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
        >
            <FontAwesome name="send" size={24} color={GlobalStyles.colors.primary500} />
        </Pressable>
    );
};

export default SendButton;