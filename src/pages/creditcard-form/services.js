export const submitForm = (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(values.ccZipCode === '1235') {
        return reject({
          status: 400,
          msg: 'Su registro no pudo completarse, intente nuevamente'
        })
      }
      resolve({
        status: 200,
        msg: 'Su registro ha sido aceptado'
      })
    }, 300);
  });
}

export const getCitiesByZC = (zp) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (zp === '1234') {
        return reject({
          status: 404,
          msg: 'Codigo postal incorrecto'
        });
      }
      resolve([
        {code: 'SR', name: 'San Rafael'},
        {code: 'SMR', name: 'Santa Maria la Ribera'},
        {code: 'NSMR', name: 'Nueva Santa Maria'},
        {code: 'BV', name: 'Buenavista'},
        {code: 'ZR', name: 'Zona Rosa'},
      ])
    }, 300);
  });
}

export const getStates = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          code: 'CM', name: 'Ciudad de Mexico',
          cities: [
            {code: 'CUA', name: 'Cuatemoc'},
            {code: 'AZC', name: 'Azcapotzalco'},
            {code: 'ALV', name: 'Alvaro Obregon'},
            {code: 'BJ', name: 'Benito Juarez'},
            {code: 'MH', name: 'Miguel Hidalgo'},
          ]
        },
        {
          code: 'EDOM', name: 'Edo de Mexico',
          cities: [
            {code: 'TB', name: 'Tlalnepantla de baz'},
            {code: 'NAU', name: 'Naucalpan'},
            {code: 'NEZ', name: 'Nezahualcoyotl'},
            {code: 'CH', name: 'Chimalhuacan'},
            {code: 'EC', name: 'Ecatepec'},
          ]
        },
        {
          code: 'CH', name: 'Chihuahua',
          cities: [
            {code: 'AX', name: 'AX'},
            {code: 'BX', name: 'BX'},
            {code: 'XZ', name: 'XZ'},
            {code: 'XB', name: 'XB'},
            {code: 'UV', name: 'UV'},
          ]
        },
        {
          code: 'MOR', name: 'Morelos',
          cities: [
            {code: 'MR', name: 'MR'},
            {code: 'MI', name: 'MI'},
            {code: 'MO', name: 'MO'},
            {code: 'PO', name: 'PO'},
            {code: 'PT', name: 'PT'},
          ]
        },
        {
          code: 'PUE', name: 'Puebla',
          cities: [
            {code: 'CI', name: 'CI'},
            {code: 'IE', name: 'IE'},
            {code: 'W0', name: 'W0'},
            {code: 'PQ', name: 'PQ'},
            {code: 'LO', name: 'LO'},
          ]
        },
      ])
    }, 600);
  });
}
