import React from 'react'
import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
// For login and Register : This is the Homepage which redirects to the chats page
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
const HomePage = () => {
    return (
        <div className='homepage'>
            <Container maxW="xl" centerContent>
                <Box
                    p={3}
                    bg="white"
                    w="100%"
                    m="40px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                >
                    <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">Chat Application</Text>
                </Box>
                <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                    <Tabs isFitted variant="soft-rounded">
                        <TabList mb="1em">
                            <Tab>Login</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <Signup />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </div>
    )
}

export default HomePage
