import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { authLogin } from "../../../Redux/auth/actions";
import { AUTH_LOGIN_RESET } from "../../../Redux/auth/actionTypes";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(initialState);
  const authState = useSelector((state) => state.auth);
  // console.log("authState: ", authState);
  const dispatch = useDispatch();

  // // -------- google login------
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      toast({
        title: "Account created.",
        description: "Successfully Created your Account",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast({
        title: error.message,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  React.useEffect(() => {
    onOpen();
    if (authState.userLogin.message === "User does not exist") {
      toast({
        title: authState.message,
        title: "Please fill correct detail",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    if (authState.userLogin.message === "Password is incorrect") {
      toast({
        title: authState.message,
        title: "Please fill correct detail",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    if (authState.userLogin.message === "Login successful") {
      toast({
        title: "Login Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      dispatch({ type: AUTH_LOGIN_RESET });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [dispatch, onOpen, navigate, authState, toast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(formData);
    dispatch(authLogin(formData));
    navigate("/")
  };
  console.log(loading);
  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "lg" }}>
        <ModalOverlay
          onClick={() => {
            navigate("/");
          }}
        />
        <ModalContent w="350px">
          <ModalHeader
            textAlign="center"
            fontWeight="bold"
            lineHeight="1"
            fontSize="30px"
            mt="25px"
          >
            LOGIN
          </ModalHeader>
          {/* <Img src="https://shopyourwardrobe.com/wp-content/uploads/2013/01/cost-of-being-a-shopaholic.jpg" /> */}
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type={"email"}
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type={"password"}
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="pink" w="100%">
              CONTINUE
            </Button>
          </ModalFooter>

          <Button
            w="86%"
            ml="25px"
            onClick={() => {
              onClose();
              navigate("/");
            }}
          >
            Cancel
          </Button>
          <p className="login_or">or</p>
          {/* ----- google Authenticated ----- */}

          <GoogleButton
            type="dark"
            onClick={handleGoogleSignIn}
            style={{
              width: "86%",
              marginBottom: "40px",
              marginLeft: "25px",
              backgroundColor: "#4285f4",
            }}
          />

          <Box mb="25px">
            <p className="loginBottam">
              By proceeding, you agree to{" "}
              <span className="span">Privacy Policy,</span> <br />
              <span>Terms & Conditions</span>
            </p>
          </Box>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default Login;
