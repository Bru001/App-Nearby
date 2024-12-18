import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        height: 120,
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderColor: colors.gray[200],
        borderRadius: 12,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',

    },
    img: {
        width: 116,
        height: 106,
        borderRadius: 8,
        backgroundColor: colors.gray[200]

    },
    conteudo: {
        flex: 1,
        gap: 4,

    },
    name: {
        color: colors.gray[600],
        fontSize: 14,
        fontFamily: fontFamily.medium, 

    },
    description: {
        color: colors.gray[500],
        fontSize: 12,
        fontFamily: fontFamily.regular,

    },
    footer: {
        flexDirection: 'row',
        gap: 7,
        marginTop: 10

    },
    ticket: {
        color: colors.gray[400],
        fontSize: 12,
        fontFamily: fontFamily.regular,
        
    }
})