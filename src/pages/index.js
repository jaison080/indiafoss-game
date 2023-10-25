import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { supabaseClient } from "@/utils/supabase";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "@/Components/Footer";

function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation here (e.g., check if email is valid, etc.)
    const newValidationErrors = {};

    if (!formData.name) {
      newValidationErrors.name = "Name is required";
    }

    if (!formData.email) {
      newValidationErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newValidationErrors.email = "Invalid email format";
    }

    if (
      newValidationErrors.name ||
      newValidationErrors.email
    ) {
      setValidationErrors(newValidationErrors);
    } else {
      const res = await axios.post("/api/register", formData);
      if(res.data.isRegistered === true){
        toast.error("Email Already Used.");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
        });
        return;
      }
      window.localStorage.setItem("token", res.data.token);
      router.push("/game-1");
    }
  };

  const isValidEmail = (email) => {
    // You can implement your email validation logic here
    // For a simple example, we're checking for the presence of an '@' character
    return email.includes("@");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundColor='#AEDEFC'
    >
      <Heading as="h1" size="2xl" mb={6}>
        Capture The Flag!
      </Heading>
      <Box
        width={{base:'95vw', md: '100%'}}
        maxW="400px"
        p={4}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        border='2px solid #190482'
      >
        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              border='2px solid #190482'
              sx={{
                '&:hover':{
                  border: '2px solid #190482'
                }
              }}
            />
            {validationErrors.name && (
              <Alert status="error" mt={2}>
                <AlertIcon />
                {validationErrors.name}
              </Alert>
            )}
          </FormControl>

          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              border='2px solid #190482'
              sx={{
                '&:hover':{
                  border: '2px solid #190482'
                }
              }}
            />
            {validationErrors.email && (
              <Alert status="error" mt={2}>
                <AlertIcon />
                {validationErrors.email}
              </Alert>
            )}
          </FormControl>

          <FormControl id="phoneNumber" mb={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              border='2px solid #190482'
              sx={{
                '&:hover':{
                  border: '2px solid #190482'
                }
              }}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" w={"100%"}>
            Play Game
          </Button>
        </form>
      </Box>
      <Footer/>
    </Box>
  );
}

export default Home;
