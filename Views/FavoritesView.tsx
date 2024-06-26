import { Box,Image, Divider, VStack, ScrollView, Button, ButtonText, View, Text, AvatarFallbackText, Avatar, Card, Heading } from '@gluestack-ui/themed';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'//async
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ApiUrl, Img } from './API/Config';

const Bagview = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});
    const [FavoriteData, setFavoriteData] = useState({});
    const [productData, setProductData] = useState<any[]>([]);
    const [carFullData, setCarFullData] = useState({});
    const [productfinData, setProductfinData] = useState({});
    const [totalData, setTotalData] = useState(0);
    const [FavoreEnd, setFavoreEnd] = useState<any[]>([]);
    const datos: any[] = [];
    const datosfinal: any[] = [];
    let tokenString;
    let token;
    let total = 0;

    useFocusEffect(
        useCallback(() => {
            const fetchUserData = async () => {
                tokenString = await AsyncStorage.getItem('token');
                token = JSON.parse(tokenString);
                let idUser;
                let FavoriteUser = [];
                let FavoriteEndarr = [];

                if (token) {
                    try {
                        const response = await axios.get(`${ApiUrl}Userauth`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        setUserData(response.data);
                        idUser = response.data.id;
                    } catch (error) {
                        console.log(" we cannot get the information ", error);
                    }
                }

                try {
                    const response = await axios.get(`${ApiUrl}showfav/${idUser}`);
                    setProductData(response.data);
                } catch (error) {
                    console.log(" we cannot get the information fav ", error);
                }
            };

            fetchUserData();
        }, [])
    );

    const onSubmit = () => {
        navigation.navigate('Home');
    }

    return (
        <Box backgroundColor='white' mt={10} display="flex" flexDirection="column" height={"$full"} width={"$full"} overflow='auto' >
            <ScrollView>
                <VStack marginTop={"$3px"} backgroundColor='white' height={"$full"} width={"$full"} >
                    {productData.map((fav, index) => (
                        <Card key={index} size="md" variant="elevated" m="$3">
                            <Image
                                mb="$6"
                                h={120}
                                width="$full"
                                borderRadius="$md"
                                source={{
                                    uri: `${Img + fav.food.Image}`,
                                }}
                            />
                            <Heading mb="$1" size="md">
                                {fav.food.Name}
                            </Heading>
                            <Text size="sm">
                                {fav.food.Price}.00 $
                            </Text>
                            <Button action={"primary"} onPress={() => navigation.navigate('Details', { Id: fav.food.id })}
                                backgroundColor={"#FFA600"} size={"lg"} width={"$full"} borderRadius={"$lg"} mt={"$2"}>
                                <ButtonText>
                                    See product
                                </ButtonText>
                            </Button>
                        </Card>
                    ))}
                </VStack>
            </ScrollView>
        </Box>
    );
}

export default Bagview;
