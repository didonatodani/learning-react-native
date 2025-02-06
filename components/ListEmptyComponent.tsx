import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

interface Props {
    loading: boolean;
    message: string;
}

export default function ListEmptyComponent({ loading, message }: Props) {
    return (
        <View style={styles.emptyContainer}>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.inactive} />
            ) : (
                <Text style={styles.emptyText}>{message}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 200,
    },
    emptyText: {
        color: COLORS.text,
        fontSize: 18,
    }
})
