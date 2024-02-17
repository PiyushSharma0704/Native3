/* eslint-disable prettier/prettier */
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
//Form Validations
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Should be of min 4 characters')
  .max(16, 'Should be max of 16')
  .required('Length is required'),
});

export default function App() {

  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);
  console.log('password', password)
  console.log('isPasswordGenerated', isPasswordGenerated)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = '!@#$%^&*';
    const numChars = '0123456789';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (number) {
      characterList += numChars;
    }
    if (symbols) {
      characterList += specialChars;
    }
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);

  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++){
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setUpperCase(false);
    setLowerCase(true);
    setSymbols(false);
    setNumber(false);
    setIsPasswordGenerated(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
      <View style={styles.formContainer}>
      <Text style={styles.titleStyle}>Password Generator</Text>
      <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={ values => {
        console.log('values', values);
        generatePasswordString(Number(values.passwordLength));
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
        <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.title}>Password Length:</Text>
           
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Example 8"
            keyboardType="numeric"
            />
         </View>
          {touched.passwordLength && errors.passwordLength && (
         <View>
            <Text style={styles.errorText}>{errors.passwordLength}</Text>
         </View>
          )}
         <View style={styles.inputWrapper}>
         <Text style={styles.title}>Include Lowercase:</Text>
         <BouncyCheckbox
         disableBuiltInState
         isChecked={lowerCase}
         onPress={() => setLowerCase(!lowerCase)}
         fillColor="#CDFADB"
         />

         </View>
         <View style={styles.inputWrapper} >
         <Text style={styles.title}>Include Uppercase:</Text>
         <BouncyCheckbox
         disableBuiltInState
         isChecked={upperCase}
         onPress={() => setUpperCase(!upperCase)}
         fillColor="#492E87"
         />
         </View>
         <View style={styles.inputWrapper} >
         <Text style={styles.title}>Include Number:</Text>
         <BouncyCheckbox
         disableBuiltInState
         isChecked={number}
         onPress={() => setNumber(!number)}
         fillColor="#FFCF96"
         />
         </View>
         <View style={styles.inputWrapper} >
         <Text style={styles.title}>Include Symbols:</Text>
         <BouncyCheckbox
         disableBuiltInState
         isChecked={symbols}
         onPress={() => setSymbols(!symbols)}
         fillColor="#FF8080"
         />
         </View>

         <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}
          >
            <Text style={styles.btnText}>Generate Password</Text>
            </TouchableOpacity>
          <TouchableOpacity 
          style={styles.secondaryBtn}
          onPress={() => {
            handleReset(); // Reset Formik form
            resetPassword(); // Reset password state
          }}
          >
            <Text style={styles.btnText}>Reset</Text>
            </TouchableOpacity>
         </View>
         </>
       )}
     </Formik>
      </View>
      {isPasswordGenerated ? (
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.paswordStyle} selectable>{password}</Text>
        </View>
      ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#265073',
  },
  appContainer: {
    flex:1,
    backgroundColor: '#9290C3',
    },
  formContainer: {
    padding: 20,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginTop: 10,
    marginBottom: 10,
  },
  inputColumn: {

  },
  inputStyle: {
    borderColor: '#000000',
    borderRadius: 8,
  },
  formActions: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    width: 200,
  },
  errorText: {
    color: '#D04848',
  },
  primaryBtn:{
    padding:10,
    backgroundColor: '#40A2E3',
    borderRadius: 4,
  },
  secondaryBtn: {
    paddingVertical:12,
    paddingHorizontal: 20,
    backgroundColor: '#40A2E3',
    borderRadius: 4,
  },
  card: {
    margin: 20,
    height: 50,
    backgroundColor: '#836FFF',
    borderRadius: 8,
    color: '#000000',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardElevated: {},
  paswordStyle: {
    color: '#ffffff',
    fontSize: 15,

  },
  btnText: {
  color: '#fff'},
});
