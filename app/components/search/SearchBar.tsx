import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useMemo, useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { Meal, RootParamList } from '@/app/types';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, globalStyles } from '@/styles';
import { MS, S } from '@/app/utils';

const SearchBar = ({ meals }: { meals: Meal[] }) => {
    const [search, setSearch] = useState("");
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    const filteredMeals = useMemo(() => {
        if (!search) return [];
        return meals?.filter(meal =>
            meal.name.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 5) || [];
    }, [search, meals]);

    return (
        <View>
            <Searchbar placeholder="Pretraži recepte"
                value={search}
                onChangeText={setSearch}
                style={styles.search} />

            {search.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    {filteredMeals.map((meal) => (
                        <TouchableOpacity key={meal.id}
                            style={styles.suggestionItem}
                            onPress={() => navigation.navigate('MealDetails', { mealId: meal.id! })}>
                            <Text style={globalStyles.text}>{meal.name}</Text>
                        </TouchableOpacity>
                    ))}

                </View>
            )}
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    search: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: COLORS.surfaceMuted,
        marginBottom: S(10),
        borderRadius: MS(10),
    },

    suggestionsContainer: {
        position: 'absolute',
        width: '90%',
        alignSelf: 'center',
        top: S(50),
        backgroundColor: COLORS.surfaceMuted,
        borderRadius: MS(10),
        elevation: 3,
        //shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 1000,
    },
    suggestionItem: {
        padding: S(15),
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
})