// Datos oficiales de la Semana Santa de Sevilla 2026
// Fuente: Consejo General de Hermandades y Cofradías de Sevilla
// Horarios del Cabildo de Toma de Horas 2026

const SEMANA_SANTA_2026 = {
  inicio: '2026-03-27', // Viernes de Dolores
  fin: '2026-04-05',    // Domingo de Resurrección
  year: 2026
};

// Coordenadas clave de Sevilla
const COORDS = {
  catedral: [37.3861, -5.9926],
  campana: [37.3905, -5.9945],
  sierpes: [37.3890, -5.9960],
  plaza_san_francisco: [37.3880, -5.9940],
  avenida_constitucion: [37.3850, -5.9935]
};

// Carrera Oficial (puntos principales)
const CARRERA_OFICIAL = [
  [37.3905, -5.9945],  // La Campana
  [37.3893, -5.9952],  // Sierpes
  [37.3880, -5.9940],  // Plaza San Francisco
  [37.3870, -5.9935],  // Av. Constitución
  [37.3861, -5.9926]   // Catedral
];

const DIAS = [
  { id: 'viernes-dolores', nombre: 'Viernes de Dolores', fecha: '2026-03-27', abrev: 'Vie. Dolores' },
  { id: 'sabado-pasion', nombre: 'Sábado de Pasión', fecha: '2026-03-28', abrev: 'Sáb. Pasión' },
  { id: 'domingo-ramos', nombre: 'Domingo de Ramos', fecha: '2026-03-29', abrev: 'Dom. Ramos' },
  { id: 'lunes-santo', nombre: 'Lunes Santo', fecha: '2026-03-30', abrev: 'Lunes' },
  { id: 'martes-santo', nombre: 'Martes Santo', fecha: '2026-03-31', abrev: 'Martes' },
  { id: 'miercoles-santo', nombre: 'Miércoles Santo', fecha: '2026-04-01', abrev: 'Miércoles' },
  { id: 'jueves-santo', nombre: 'Jueves Santo', fecha: '2026-04-02', abrev: 'Jueves' },
  { id: 'madruga', nombre: 'Madrugá', fecha: '2026-04-03', abrev: 'Madrugá' },
  { id: 'viernes-santo', nombre: 'Viernes Santo', fecha: '2026-04-03', abrev: 'Viernes' },
  { id: 'sabado-santo', nombre: 'Sábado Santo', fecha: '2026-04-04', abrev: 'Sábado' },
  { id: 'domingo-resurreccion', nombre: 'Domingo de Resurrección', fecha: '2026-04-05', abrev: 'Resurrección' }
];

const COFRADIAS = [
  // ==================== VIERNES DE DOLORES ====================
  {
    id: 'bendicion-esperanza',
    nombre: 'Bendición y Esperanza',
    nombreCompleto: 'Hermandad de la Bendición y Esperanza',
    dia: 'viernes-dolores',
    iglesia: 'Parroquia de la Bendición',
    barrio: 'Bellavista',
    horaSalida: '17:00',
    horaRecogida: '01:40',
    pasos: 1,
    descripcion: 'Hermandad de vísperas que realiza su estación de penitencia el Viernes de Dolores.',
    coordsTemplo: [37.3540, -5.9780],
    recorrido: [
      [37.3540, -5.9780], [37.3600, -5.9820], [37.3700, -5.9870],
      [37.3800, -5.9920], [37.3861, -5.9926], [37.3800, -5.9920],
      [37.3600, -5.9820], [37.3540, -5.9780]
    ]
  },
  {
    id: 'pino-montano',
    nombre: 'Pino Montano',
    nombreCompleto: 'Hermandad de Pino Montano',
    dia: 'viernes-dolores',
    iglesia: 'Parroquia de Pino Montano',
    barrio: 'Pino Montano',
    horaSalida: '17:45',
    horaRecogida: '02:20',
    pasos: 1,
    descripcion: 'Cofradía de vísperas del barrio de Pino Montano.',
    coordsTemplo: [37.4180, -5.9830],
    recorrido: [
      [37.4180, -5.9830], [37.4100, -5.9850], [37.4000, -5.9880],
      [37.3900, -5.9930], [37.3861, -5.9926], [37.3900, -5.9930],
      [37.4100, -5.9850], [37.4180, -5.9830]
    ]
  },
  {
    id: 'la-mision',
    nombre: 'La Misión',
    nombreCompleto: 'Hermandad de la Misión',
    dia: 'viernes-dolores',
    iglesia: 'Capilla de la Misión',
    barrio: 'Triana',
    horaSalida: '18:15',
    horaRecogida: '01:00',
    pasos: 1,
    descripcion: 'Hermandad de vísperas con sede en Triana.',
    coordsTemplo: [37.3830, -6.0050],
    recorrido: [
      [37.3830, -6.0050], [37.3840, -6.0000], [37.3860, -5.9970],
      [37.3861, -5.9926], [37.3860, -5.9970], [37.3840, -6.0000],
      [37.3830, -6.0050]
    ]
  },
  {
    id: 'dulce-nombre-bellavista',
    nombre: 'Dulce Nombre de Bellavista',
    nombreCompleto: 'Hermandad del Dulce Nombre de Bellavista',
    dia: 'viernes-dolores',
    iglesia: 'Parroquia de Bellavista',
    barrio: 'Bellavista',
    horaSalida: '18:30',
    horaRecogida: '01:45',
    pasos: 1,
    descripcion: 'Cofradía de vísperas del barrio de Bellavista.',
    coordsTemplo: [37.3500, -5.9750],
    recorrido: [
      [37.3500, -5.9750], [37.3580, -5.9800], [37.3700, -5.9860],
      [37.3800, -5.9910], [37.3861, -5.9926], [37.3800, -5.9910],
      [37.3580, -5.9800], [37.3500, -5.9750]
    ]
  },
  {
    id: 'la-corona',
    nombre: 'La Corona',
    nombreCompleto: 'Hermandad de la Corona',
    dia: 'viernes-dolores',
    iglesia: 'Iglesia de la Corona',
    barrio: 'Centro',
    horaSalida: '19:00',
    horaRecogida: '23:15',
    pasos: 1,
    descripcion: 'Hermandad de vísperas del centro de Sevilla.',
    coordsTemplo: [37.3895, -5.9900],
    recorrido: [
      [37.3895, -5.9900], [37.3880, -5.9920], [37.3870, -5.9930],
      [37.3861, -5.9926], [37.3870, -5.9930], [37.3880, -5.9920],
      [37.3895, -5.9900]
    ]
  },
  {
    id: 'pasion-muerte',
    nombre: 'Pasión y Muerte',
    nombreCompleto: 'Hermandad de la Pasión y Muerte',
    dia: 'viernes-dolores',
    iglesia: 'Parroquia de la Pasión',
    barrio: 'Nervión',
    horaSalida: '20:00',
    horaRecogida: '00:10',
    pasos: 1,
    descripcion: 'Cofradía de vísperas del barrio de Nervión.',
    coordsTemplo: [37.3880, -5.9750],
    recorrido: [
      [37.3880, -5.9750], [37.3880, -5.9820], [37.3870, -5.9880],
      [37.3861, -5.9926], [37.3870, -5.9880], [37.3880, -5.9820],
      [37.3880, -5.9750]
    ]
  },

  // ==================== SÁBADO DE PASIÓN ====================
  {
    id: 'santo-angel',
    nombre: 'Santo Ángel',
    nombreCompleto: 'Hermandad del Santo Ángel',
    dia: 'sabado-pasion',
    iglesia: 'Iglesia del Santo Ángel',
    barrio: 'Centro',
    horaSalida: '14:30',
    horaRecogida: '21:00',
    pasos: 2,
    descripcion: 'Hermandad de vísperas con sede en pleno centro de Sevilla. El Crucificado de los Desamparados está atribuido a Martínez Montañés.',
    coordsTemplo: [37.3880, -5.9920],
    recorrido: [
      [37.3880, -5.9920], [37.3885, -5.9930], [37.3890, -5.9940],
      [37.3895, -5.9945], [37.3880, -5.9940], [37.3870, -5.9935],
      [37.3861, -5.9926], [37.3870, -5.9935], [37.3880, -5.9920]
    ]
  },
  {
    id: 'la-milagrosa',
    nombre: 'La Milagrosa',
    nombreCompleto: 'Hermandad de la Milagrosa',
    dia: 'sabado-pasion',
    iglesia: 'Parroquia de la Milagrosa',
    barrio: 'Ciudad Jardín',
    horaSalida: '16:30',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Hermandad de vísperas del barrio de Ciudad Jardín. Destaca su paso de misterio del Puente Cedrón.',
    coordsTemplo: [37.3800, -5.9730],
    recorrido: [
      [37.3800, -5.9730], [37.3820, -5.9780], [37.3840, -5.9830],
      [37.3860, -5.9880], [37.3861, -5.9926], [37.3860, -5.9880],
      [37.3840, -5.9830], [37.3800, -5.9730]
    ]
  },
  {
    id: 'la-espiga',
    nombre: 'La Espiga',
    nombreCompleto: 'Hermandad de la Humildad (La Espiga)',
    dia: 'sabado-pasion',
    iglesia: 'Parroquia de Sevilla Este',
    barrio: 'Sevilla Este',
    horaSalida: '17:30',
    horaRecogida: '01:00',
    pasos: 2,
    descripcion: 'Hermandad de Sevilla Este. En 2026 realiza su primera salida desde el interior del templo tras las obras de rehabilitación.',
    coordsTemplo: [37.3920, -5.9450],
    recorrido: [
      [37.3920, -5.9450], [37.3910, -5.9550], [37.3890, -5.9700],
      [37.3870, -5.9850], [37.3861, -5.9926], [37.3870, -5.9850],
      [37.3910, -5.9550], [37.3920, -5.9450]
    ]
  },
  {
    id: 'torreblanca-sabado',
    nombre: 'Torreblanca',
    nombreCompleto: 'Hermandad de Torreblanca',
    dia: 'sabado-pasion',
    iglesia: 'Parroquia del Inmaculado Corazón de María',
    barrio: 'Torreblanca',
    horaSalida: '19:00',
    horaRecogida: '02:00',
    pasos: 2,
    descripcion: 'Hermandad del barrio de Torreblanca, una de las cofradías de vísperas más populares.',
    coordsTemplo: [37.3750, -5.9490],
    recorrido: [
      [37.3750, -5.9490], [37.3770, -5.9580], [37.3800, -5.9700],
      [37.3840, -5.9850], [37.3861, -5.9926], [37.3840, -5.9850],
      [37.3770, -5.9580], [37.3750, -5.9490]
    ]
  },
  {
    id: 'san-jose-obrero',
    nombre: 'San José Obrero',
    nombreCompleto: 'Hermandad de San José Obrero',
    dia: 'sabado-pasion',
    iglesia: 'Parroquia de San José Obrero',
    barrio: 'Cerro del Águila',
    horaSalida: '21:30',
    horaRecogida: '03:30',
    pasos: 2,
    descripcion: 'Hermandad del barrio del Cerro del Águila que procesiona en la noche del Sábado de Pasión.',
    coordsTemplo: [37.3710, -5.9650],
    recorrido: [
      [37.3710, -5.9650], [37.3740, -5.9720], [37.3780, -5.9800],
      [37.3830, -5.9880], [37.3861, -5.9926], [37.3830, -5.9880],
      [37.3740, -5.9720], [37.3710, -5.9650]
    ]
  },
  {
    id: 'divino-perdon',
    nombre: 'Divino Perdón',
    nombreCompleto: 'Hermandad del Divino Perdón (Alcosa)',
    dia: 'sabado-pasion',
    iglesia: 'Parroquia de Alcosa',
    barrio: 'Parque Alcosa',
    horaSalida: '23:00',
    horaRecogida: '04:30',
    pasos: 2,
    descripcion: 'Hermandad del Parque Alcosa que realiza su estación de penitencia en la noche del Sábado de Pasión.',
    coordsTemplo: [37.4100, -5.9400],
    recorrido: [
      [37.4100, -5.9400], [37.4050, -5.9500], [37.3980, -5.9650],
      [37.3920, -5.9800], [37.3861, -5.9926], [37.3920, -5.9800],
      [37.4050, -5.9500], [37.4100, -5.9400]
    ]
  },
  {
    id: 'padre-pio',
    nombre: 'Padre Pío',
    nombreCompleto: 'Hermandad de Padre Pío',
    dia: 'sabado-pasion',
    iglesia: 'Parroquia de Padre Pío',
    barrio: 'Palmete',
    horaSalida: '00:30',
    horaRecogida: '05:00',
    pasos: 1,
    descripcion: 'La última cofradía del Sábado de Pasión, procesionando ya en la madrugada del Domingo de Ramos.',
    coordsTemplo: [37.3680, -5.9520],
    recorrido: [
      [37.3680, -5.9520], [37.3720, -5.9600], [37.3770, -5.9720],
      [37.3830, -5.9850], [37.3861, -5.9926], [37.3830, -5.9850],
      [37.3720, -5.9600], [37.3680, -5.9520]
    ]
  },

  // ==================== DOMINGO DE RAMOS ====================
  {
    id: 'la-borriquita',
    nombre: 'La Borriquita',
    nombreCompleto: 'Hermandad de la Entrada en Jerusalén (La Borriquita)',
    dia: 'domingo-ramos',
    iglesia: 'Iglesia del Salvador',
    barrio: 'Centro',
    horaSalida: '14:30',
    horaRecogida: '19:00',
    pasos: 1,
    descripcion: 'La primera cofradía en salir el Domingo de Ramos. Representa la entrada triunfal de Jesús en Jerusalén montado en una borriquita. Muy popular entre los niños.',
    coordsTemplo: [37.3886, -5.9918],
    recorrido: [
      [37.3886, -5.9918], [37.3890, -5.9930], [37.3905, -5.9945],
      [37.3893, -5.9952], [37.3880, -5.9940], [37.3870, -5.9935],
      [37.3861, -5.9926], [37.3870, -5.9935], [37.3886, -5.9918]
    ]
  },
  {
    id: 'jesus-despojado',
    nombre: 'Jesús Despojado',
    nombreCompleto: 'Hermandad de Jesús Despojado de sus Vestiduras',
    dia: 'domingo-ramos',
    iglesia: 'Iglesia de San Benito de Calatrava',
    barrio: 'Centro',
    horaSalida: '14:00',
    horaRecogida: '21:30',
    pasos: 2,
    descripcion: 'Hermandad que representa el momento en que Jesús es despojado de sus vestiduras antes de la crucifixión.',
    coordsTemplo: [37.3920, -5.9985],
    recorrido: [
      [37.3920, -5.9985], [37.3910, -5.9970], [37.3905, -5.9945],
      [37.3893, -5.9952], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3880, -5.9940], [37.3910, -5.9970], [37.3920, -5.9985]
    ]
  },
  {
    id: 'la-hiniesta',
    nombre: 'La Hiniesta',
    nombreCompleto: 'Hermandad de la Hiniesta',
    dia: 'domingo-ramos',
    iglesia: 'Iglesia de San Julián',
    barrio: 'San Julián',
    horaSalida: '13:00',
    horaRecogida: '23:00',
    pasos: 2,
    descripcion: 'Una de las hermandades más antiguas de Sevilla, con gran devoción mariana. La Virgen de la Hiniesta es una de las más veneradas.',
    coordsTemplo: [37.3960, -5.9920],
    recorrido: [
      [37.3960, -5.9920], [37.3940, -5.9930], [37.3920, -5.9940],
      [37.3905, -5.9945], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3880, -5.9940], [37.3920, -5.9940], [37.3960, -5.9920]
    ]
  },
  {
    id: 'la-paz',
    nombre: 'La Paz',
    nombreCompleto: 'Hermandad de la Paz',
    dia: 'domingo-ramos',
    iglesia: 'Iglesia de San Sebastián',
    barrio: 'Centro',
    horaSalida: '13:00',
    horaRecogida: '22:30',
    pasos: 2,
    descripcion: 'Hermandad con sede en la iglesia de San Sebastián, muy querida por los sevillanos.',
    coordsTemplo: [37.3870, -5.9870],
    recorrido: [
      [37.3870, -5.9870], [37.3870, -5.9900], [37.3875, -5.9920],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3870, -5.9900], [37.3870, -5.9870]
    ]
  },
  {
    id: 'la-cena',
    nombre: 'La Cena',
    nombreCompleto: 'Hermandad de la Sagrada Cena',
    dia: 'domingo-ramos',
    iglesia: 'Capilla de Nuestra Señora del Rosario',
    barrio: 'Los Remedios',
    horaSalida: '16:00',
    horaRecogida: '00:00',
    pasos: 2,
    descripcion: 'Representa la Última Cena de Jesús con sus apóstoles. Su paso de misterio es uno de los más monumentales.',
    coordsTemplo: [37.3780, -6.0050],
    recorrido: [
      [37.3780, -6.0050], [37.3800, -6.0010], [37.3830, -5.9980],
      [37.3860, -5.9950], [37.3861, -5.9926], [37.3860, -5.9950],
      [37.3830, -5.9980], [37.3780, -6.0050]
    ]
  },
  {
    id: 'san-roque',
    nombre: 'San Roque',
    nombreCompleto: 'Hermandad de San Roque',
    dia: 'domingo-ramos',
    iglesia: 'Iglesia de San Roque',
    barrio: 'San Roque',
    horaSalida: '16:30',
    horaRecogida: '01:30',
    pasos: 2,
    descripcion: 'Hermandad del barrio de San Roque con gran arraigo popular.',
    coordsTemplo: [37.3920, -5.9860],
    recorrido: [
      [37.3920, -5.9860], [37.3910, -5.9890], [37.3900, -5.9920],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3910, -5.9890], [37.3920, -5.9860]
    ]
  },
  {
    id: 'la-amargura',
    nombre: 'La Amargura',
    nombreCompleto: 'Hermandad de la Amargura',
    dia: 'domingo-ramos',
    iglesia: 'Iglesia de San Juan de la Palma',
    barrio: 'San Juan de la Palma',
    horaSalida: '18:00',
    horaRecogida: '01:30',
    pasos: 2,
    descripcion: 'Una de las hermandades más señoriales de Sevilla. Su paso por la calle Sierpes es uno de los momentos más esperados del Domingo de Ramos.',
    coordsTemplo: [37.3935, -5.9955],
    recorrido: [
      [37.3935, -5.9955], [37.3920, -5.9950], [37.3905, -5.9945],
      [37.3893, -5.9952], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3880, -5.9940], [37.3920, -5.9950], [37.3935, -5.9955]
    ]
  },
  {
    id: 'la-estrella',
    nombre: 'La Estrella',
    nombreCompleto: 'Hermandad de la Estrella',
    dia: 'domingo-ramos',
    iglesia: 'Capilla de la Estrella',
    barrio: 'Triana',
    horaSalida: '17:30',
    horaRecogida: '02:30',
    pasos: 2,
    descripcion: 'Hermandad trianera con gran fervor. La Virgen de la Estrella es una de las imágenes más bellas de la Semana Santa.',
    coordsTemplo: [37.3845, -6.0030],
    recorrido: [
      [37.3845, -6.0030], [37.3850, -6.0000], [37.3855, -5.9970],
      [37.3860, -5.9950], [37.3861, -5.9926], [37.3860, -5.9950],
      [37.3850, -6.0000], [37.3845, -6.0030]
    ]
  },
  {
    id: 'el-amor',
    nombre: 'El Amor',
    nombreCompleto: 'Hermandad del Amor',
    dia: 'domingo-ramos',
    iglesia: 'Iglesia del Salvador',
    barrio: 'Centro',
    horaSalida: '20:30',
    horaRecogida: '02:30',
    pasos: 2,
    descripcion: 'Cierra la jornada del Domingo de Ramos. El Cristo del Amor es una de las tallas más importantes de Juan de Mesa.',
    coordsTemplo: [37.3886, -5.9918],
    recorrido: [
      [37.3886, -5.9918], [37.3890, -5.9930], [37.3905, -5.9945],
      [37.3893, -5.9952], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3880, -5.9940], [37.3890, -5.9930], [37.3886, -5.9918]
    ]
  },

  // ==================== LUNES SANTO ====================
  {
    id: 'san-pablo',
    nombre: 'San Pablo',
    nombreCompleto: 'Hermandad de San Pablo',
    dia: 'lunes-santo',
    iglesia: 'Parroquia de San Pablo',
    barrio: 'San Pablo',
    horaSalida: '13:00',
    horaRecogida: '23:30',
    pasos: 2,
    descripcion: 'Hermandad del populoso barrio de San Pablo, con gran devoción en su feligresía.',
    coordsTemplo: [37.4050, -5.9760],
    recorrido: [
      [37.4050, -5.9760], [37.4000, -5.9800], [37.3950, -5.9860],
      [37.3905, -5.9945], [37.3861, -5.9926], [37.3905, -5.9945],
      [37.4000, -5.9800], [37.4050, -5.9760]
    ]
  },
  {
    id: 'la-redencion',
    nombre: 'La Redención',
    nombreCompleto: 'Hermandad de la Redención',
    dia: 'lunes-santo',
    iglesia: 'Parroquia de Santiago',
    barrio: 'Nervión',
    horaSalida: '14:30',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Hermandad del barrio de Nervión que ha crecido notablemente en los últimos años.',
    coordsTemplo: [37.3880, -5.9760],
    recorrido: [
      [37.3880, -5.9760], [37.3880, -5.9820], [37.3880, -5.9880],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3880, -5.9820], [37.3880, -5.9760]
    ]
  },
  {
    id: 'santa-genoveva',
    nombre: 'Santa Genoveva',
    nombreCompleto: 'Hermandad de Santa Genoveva',
    dia: 'lunes-santo',
    iglesia: 'Parroquia de Santa Genoveva',
    barrio: 'Torreblanca',
    horaSalida: '13:30',
    horaRecogida: '23:45',
    pasos: 2,
    descripcion: 'Hermandad del barrio de Torreblanca, una de las más populares del Lunes Santo.',
    coordsTemplo: [37.3750, -5.9500],
    recorrido: [
      [37.3750, -5.9500], [37.3780, -5.9600], [37.3820, -5.9750],
      [37.3860, -5.9880], [37.3861, -5.9926], [37.3860, -5.9880],
      [37.3780, -5.9600], [37.3750, -5.9500]
    ]
  },
  {
    id: 'santa-marta',
    nombre: 'Santa Marta',
    nombreCompleto: 'Hermandad de Santa Marta',
    dia: 'lunes-santo',
    iglesia: 'Iglesia de San Andrés',
    barrio: 'Centro',
    horaSalida: '18:00',
    horaRecogida: '22:30',
    pasos: 1,
    descripcion: 'Hermandad de silencio del Lunes Santo. Su sobriedad y recogimiento la hacen única.',
    coordsTemplo: [37.3930, -5.9975],
    recorrido: [
      [37.3930, -5.9975], [37.3920, -5.9960], [37.3905, -5.9945],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3920, -5.9960], [37.3930, -5.9975]
    ]
  },
  {
    id: 'san-gonzalo',
    nombre: 'San Gonzalo',
    nombreCompleto: 'Hermandad de San Gonzalo',
    dia: 'lunes-santo',
    iglesia: 'Parroquia de San Gonzalo',
    barrio: 'Triana',
    horaSalida: '15:00',
    horaRecogida: '02:00',
    pasos: 2,
    descripcion: 'Gran hermandad trianera con miles de nazarenos. La Virgen de la Salud es una de las más queridas del barrio.',
    coordsTemplo: [37.3810, -6.0100],
    recorrido: [
      [37.3810, -6.0100], [37.3820, -6.0050], [37.3840, -6.0000],
      [37.3860, -5.9950], [37.3861, -5.9926], [37.3860, -5.9950],
      [37.3820, -6.0050], [37.3810, -6.0100]
    ]
  },
  {
    id: 'vera-cruz',
    nombre: 'Vera Cruz',
    nombreCompleto: 'Hermandad de la Vera Cruz',
    dia: 'lunes-santo',
    iglesia: 'Iglesia de la Vera Cruz (San Alberto)',
    barrio: 'Arenal',
    horaSalida: '19:30',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Una de las hermandades más antiguas de Sevilla, fundada en el siglo XIV.',
    coordsTemplo: [37.3860, -5.9980],
    recorrido: [
      [37.3860, -5.9980], [37.3865, -5.9960], [37.3870, -5.9940],
      [37.3861, -5.9926], [37.3870, -5.9940], [37.3865, -5.9960],
      [37.3860, -5.9980]
    ]
  },
  {
    id: 'las-penas',
    nombre: 'Las Penas',
    nombreCompleto: 'Hermandad de las Penas de San Vicente',
    dia: 'lunes-santo',
    iglesia: 'Iglesia de San Vicente',
    barrio: 'San Vicente',
    horaSalida: '20:00',
    horaRecogida: '01:00',
    pasos: 2,
    descripcion: 'Hermandad del barrio de San Vicente con gran tradición cofrade.',
    coordsTemplo: [37.3920, -6.0010],
    recorrido: [
      [37.3920, -6.0010], [37.3910, -5.9990], [37.3900, -5.9960],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3910, -5.9990], [37.3920, -6.0010]
    ]
  },
  {
    id: 'las-aguas',
    nombre: 'Las Aguas',
    nombreCompleto: 'Hermandad de las Aguas',
    dia: 'lunes-santo',
    iglesia: 'Iglesia del Sagrario',
    barrio: 'Centro',
    horaSalida: '18:30',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Hermandad con sede junto a la Catedral, en la iglesia del Sagrario.',
    coordsTemplo: [37.3865, -5.9935],
    recorrido: [
      [37.3865, -5.9935], [37.3870, -5.9940], [37.3880, -5.9940],
      [37.3905, -5.9945], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3865, -5.9935]
    ]
  },
  {
    id: 'el-museo',
    nombre: 'El Museo',
    nombreCompleto: 'Hermandad del Museo',
    dia: 'lunes-santo',
    iglesia: 'Iglesia del Museo (Bellas Artes)',
    barrio: 'Museo',
    horaSalida: '20:45',
    horaRecogida: '02:15',
    pasos: 2,
    descripcion: 'Cierra el Lunes Santo. Su sede está junto al Museo de Bellas Artes.',
    coordsTemplo: [37.3940, -6.0000],
    recorrido: [
      [37.3940, -6.0000], [37.3930, -5.9980], [37.3910, -5.9960],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3930, -5.9980], [37.3940, -6.0000]
    ]
  },

  // ==================== MARTES SANTO ====================
  {
    id: 'el-cerro',
    nombre: 'El Cerro',
    nombreCompleto: 'Hermandad del Cerro del Águila',
    dia: 'martes-santo',
    iglesia: 'Parroquia del Cerro del Águila',
    barrio: 'Cerro del Águila',
    horaSalida: '11:40',
    horaRecogida: '02:30',
    pasos: 2,
    descripcion: 'La primera cofradía en salir el Martes Santo. Recorre un largo itinerario desde su barrio hasta la Catedral.',
    coordsTemplo: [37.3730, -5.9680],
    recorrido: [
      [37.3730, -5.9680], [37.3770, -5.9750], [37.3820, -5.9830],
      [37.3860, -5.9900], [37.3861, -5.9926], [37.3860, -5.9900],
      [37.3770, -5.9750], [37.3730, -5.9680]
    ]
  },
  {
    id: 'san-benito',
    nombre: 'San Benito',
    nombreCompleto: 'Hermandad de San Benito',
    dia: 'martes-santo',
    iglesia: 'Iglesia de San Benito',
    barrio: 'San Benito',
    horaSalida: '14:30',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Hermandad con sede en la iglesia de San Benito, de gran tradición.',
    coordsTemplo: [37.3960, -5.9965],
    recorrido: [
      [37.3960, -5.9965], [37.3940, -5.9960], [37.3920, -5.9950],
      [37.3905, -5.9945], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3905, -5.9945], [37.3940, -5.9960], [37.3960, -5.9965]
    ]
  },
  {
    id: 'dulce-nombre',
    nombre: 'Dulce Nombre',
    nombreCompleto: 'Hermandad del Dulce Nombre de Jesús',
    dia: 'martes-santo',
    iglesia: 'Iglesia de San Esteban',
    barrio: 'San Esteban',
    horaSalida: '17:30',
    horaRecogida: '23:30',
    pasos: 2,
    descripcion: 'Hermandad con gran devoción al Dulce Nombre de Jesús.',
    coordsTemplo: [37.3850, -5.9860],
    recorrido: [
      [37.3850, -5.9860], [37.3855, -5.9890], [37.3860, -5.9910],
      [37.3870, -5.9935], [37.3861, -5.9926], [37.3870, -5.9935],
      [37.3855, -5.9890], [37.3850, -5.9860]
    ]
  },
  {
    id: 'los-estudiantes',
    nombre: 'Los Estudiantes',
    nombreCompleto: 'Hermandad de los Estudiantes',
    dia: 'martes-santo',
    iglesia: 'Capilla de la Universidad',
    barrio: 'Centro',
    horaSalida: '18:30',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Hermandad universitaria fundada en 1924. Su Cristo de la Buena Muerte es obra de Juan de Mesa.',
    coordsTemplo: [37.3870, -5.9870],
    recorrido: [
      [37.3870, -5.9870], [37.3870, -5.9900], [37.3870, -5.9930],
      [37.3861, -5.9926], [37.3870, -5.9930], [37.3870, -5.9900],
      [37.3870, -5.9870]
    ]
  },
  {
    id: 'san-esteban',
    nombre: 'San Esteban',
    nombreCompleto: 'Hermandad de San Esteban',
    dia: 'martes-santo',
    iglesia: 'Iglesia de San Esteban',
    barrio: 'San Esteban',
    horaSalida: '17:00',
    horaRecogida: '01:00',
    pasos: 2,
    descripcion: 'Hermandad del barrio de San Esteban con gran arraigo en su feligresía.',
    coordsTemplo: [37.3840, -5.9850],
    recorrido: [
      [37.3840, -5.9850], [37.3850, -5.9880], [37.3860, -5.9910],
      [37.3861, -5.9926], [37.3860, -5.9910], [37.3850, -5.9880],
      [37.3840, -5.9850]
    ]
  },
  {
    id: 'los-javieres',
    nombre: 'Los Javieres',
    nombreCompleto: 'Hermandad de los Javieres',
    dia: 'martes-santo',
    iglesia: 'Capilla de San José',
    barrio: 'Centro',
    horaSalida: '19:00',
    horaRecogida: '01:30',
    pasos: 2,
    descripcion: 'Hermandad jesuita con sede en la capilla de San José, en pleno centro.',
    coordsTemplo: [37.3900, -5.9950],
    recorrido: [
      [37.3900, -5.9950], [37.3895, -5.9945], [37.3880, -5.9940],
      [37.3861, -5.9926], [37.3880, -5.9940], [37.3895, -5.9945],
      [37.3900, -5.9950]
    ]
  },
  {
    id: 'santa-cruz',
    nombre: 'Santa Cruz',
    nombreCompleto: 'Hermandad de Santa Cruz',
    dia: 'martes-santo',
    iglesia: 'Iglesia de Santa Cruz',
    barrio: 'Santa Cruz',
    horaSalida: '19:30',
    horaRecogida: '01:30',
    pasos: 2,
    descripcion: 'Hermandad del emblemático barrio de Santa Cruz, junto a los Jardines de Murillo.',
    coordsTemplo: [37.3845, -5.9880],
    recorrido: [
      [37.3845, -5.9880], [37.3850, -5.9900], [37.3855, -5.9920],
      [37.3861, -5.9926], [37.3855, -5.9920], [37.3850, -5.9900],
      [37.3845, -5.9880]
    ]
  },
  {
    id: 'la-candelaria',
    nombre: 'La Candelaria',
    nombreCompleto: 'Hermandad de la Candelaria',
    dia: 'martes-santo',
    iglesia: 'Iglesia de la Candelaria',
    barrio: 'La Candelaria',
    horaSalida: '17:30',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Hermandad con sede en el barrio de la Candelaria, cerca de San Bernardo.',
    coordsTemplo: [37.3810, -5.9850],
    recorrido: [
      [37.3810, -5.9850], [37.3830, -5.9880], [37.3850, -5.9910],
      [37.3861, -5.9926], [37.3850, -5.9910], [37.3830, -5.9880],
      [37.3810, -5.9850]
    ]
  },

  // ==================== MIÉRCOLES SANTO ====================
  {
    id: 'el-carmen',
    nombre: 'El Carmen Doloroso',
    nombreCompleto: 'Hermandad del Carmen Doloroso',
    dia: 'miercoles-santo',
    iglesia: 'Parroquia del Carmen',
    barrio: 'Nervión',
    horaSalida: '15:00',
    horaRecogida: '23:30',
    pasos: 2,
    descripcion: 'Hermandad del barrio de Nervión, una de las primeras en salir el Miércoles Santo.',
    coordsTemplo: [37.3870, -5.9730],
    recorrido: [
      [37.3870, -5.9730], [37.3870, -5.9800], [37.3870, -5.9870],
      [37.3870, -5.9930], [37.3861, -5.9926], [37.3870, -5.9930],
      [37.3870, -5.9800], [37.3870, -5.9730]
    ]
  },
  {
    id: 'la-sed',
    nombre: 'La Sed',
    nombreCompleto: 'Hermandad de la Sed',
    dia: 'miercoles-santo',
    iglesia: 'Capilla de la Sed',
    barrio: 'Nervión',
    horaSalida: '12:00',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'La primera cofradía del Miércoles Santo. Representa el momento de la sed de Cristo en la cruz.',
    coordsTemplo: [37.3840, -5.9720],
    recorrido: [
      [37.3840, -5.9720], [37.3850, -5.9780], [37.3860, -5.9850],
      [37.3870, -5.9920], [37.3861, -5.9926], [37.3870, -5.9920],
      [37.3850, -5.9780], [37.3840, -5.9720]
    ]
  },
  {
    id: 'san-bernardo',
    nombre: 'San Bernardo',
    nombreCompleto: 'Hermandad de San Bernardo',
    dia: 'miercoles-santo',
    iglesia: 'Parroquia de San Bernardo',
    barrio: 'San Bernardo',
    horaSalida: '14:15',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Hermandad del castizo barrio de San Bernardo, junto a la Plaza de España. Una de las más queridas.',
    coordsTemplo: [37.3790, -5.9870],
    recorrido: [
      [37.3790, -5.9870], [37.3810, -5.9890], [37.3840, -5.9910],
      [37.3861, -5.9926], [37.3840, -5.9910], [37.3810, -5.9890],
      [37.3790, -5.9870]
    ]
  },
  {
    id: 'buen-fin',
    nombre: 'Buen Fin',
    nombreCompleto: 'Hermandad del Buen Fin',
    dia: 'miercoles-santo',
    iglesia: 'Capilla de San Antonio de Padua',
    barrio: 'Centro',
    horaSalida: '16:00',
    horaRecogida: '23:30',
    pasos: 2,
    descripcion: 'Hermandad con sede en pleno centro de Sevilla.',
    coordsTemplo: [37.3900, -5.9970],
    recorrido: [
      [37.3900, -5.9970], [37.3895, -5.9955], [37.3880, -5.9940],
      [37.3861, -5.9926], [37.3880, -5.9940], [37.3895, -5.9955],
      [37.3900, -5.9970]
    ]
  },
  {
    id: 'la-lanzada',
    nombre: 'La Lanzada',
    nombreCompleto: 'Hermandad de la Lanzada',
    dia: 'miercoles-santo',
    iglesia: 'Iglesia de San Martín',
    barrio: 'Centro',
    horaSalida: '17:00',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Representa el momento de la lanzada en el costado de Cristo. Hermandad muy popular.',
    coordsTemplo: [37.3940, -5.9950],
    recorrido: [
      [37.3940, -5.9950], [37.3925, -5.9948], [37.3905, -5.9945],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3925, -5.9948], [37.3940, -5.9950]
    ]
  },
  {
    id: 'el-baratillo',
    nombre: 'El Baratillo',
    nombreCompleto: 'Hermandad del Baratillo',
    dia: 'miercoles-santo',
    iglesia: 'Capilla del Baratillo',
    barrio: 'Arenal',
    horaSalida: '17:00',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Hermandad del Arenal, junto a la Plaza de Toros. La Piedad del Baratillo es una imagen muy venerada.',
    coordsTemplo: [37.3850, -5.9980],
    recorrido: [
      [37.3850, -5.9980], [37.3855, -5.9960], [37.3860, -5.9940],
      [37.3861, -5.9926], [37.3860, -5.9940], [37.3855, -5.9960],
      [37.3850, -5.9980]
    ]
  },
  {
    id: 'los-panaderos',
    nombre: 'Los Panaderos',
    nombreCompleto: 'Hermandad de los Panaderos',
    dia: 'miercoles-santo',
    iglesia: 'Capilla de los Panaderos',
    barrio: 'Centro',
    horaSalida: '19:00',
    horaRecogida: '02:00',
    pasos: 2,
    descripcion: 'Hermandad gremial de los panaderos de Sevilla. Cierra el Miércoles Santo.',
    coordsTemplo: [37.3910, -5.9940],
    recorrido: [
      [37.3910, -5.9940], [37.3905, -5.9945], [37.3893, -5.9952],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3905, -5.9945], [37.3910, -5.9940]
    ]
  },

  // ==================== JUEVES SANTO ====================
  {
    id: 'los-negritos',
    nombre: 'Los Negritos',
    nombreCompleto: 'Hermandad de los Negritos',
    dia: 'jueves-santo',
    iglesia: 'Capilla de los Ángeles',
    barrio: 'Centro',
    horaSalida: '15:00',
    horaRecogida: '23:30',
    pasos: 2,
    descripcion: 'La hermandad más antigua de las de penitencia de Sevilla, fundada en el siglo XIV por el arzobispo Gonzalo de Mena.',
    coordsTemplo: [37.3900, -5.9905],
    recorrido: [
      [37.3900, -5.9905], [37.3895, -5.9920], [37.3880, -5.9940],
      [37.3861, -5.9926], [37.3880, -5.9940], [37.3895, -5.9920],
      [37.3900, -5.9905]
    ]
  },
  {
    id: 'exaltacion',
    nombre: 'La Exaltación',
    nombreCompleto: 'Hermandad de la Exaltación',
    dia: 'jueves-santo',
    iglesia: 'Iglesia de Santa Catalina',
    barrio: 'Santa Catalina',
    horaSalida: '16:00',
    horaRecogida: '01:00',
    pasos: 2,
    descripcion: 'Hermandad con sede en la iglesia de Santa Catalina. Representa la exaltación de Cristo en la cruz.',
    coordsTemplo: [37.3920, -5.9910],
    recorrido: [
      [37.3920, -5.9910], [37.3910, -5.9920], [37.3900, -5.9935],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3910, -5.9920], [37.3920, -5.9910]
    ]
  },
  {
    id: 'cigarreras',
    nombre: 'Las Cigarreras',
    nombreCompleto: 'Hermandad de las Cigarreras',
    dia: 'jueves-santo',
    iglesia: 'Capilla de la Fábrica de Tabacos',
    barrio: 'Centro',
    horaSalida: '17:00',
    horaRecogida: '00:30',
    pasos: 2,
    descripcion: 'Hermandad vinculada históricamente a las trabajadoras de la Real Fábrica de Tabacos.',
    coordsTemplo: [37.3830, -5.9900],
    recorrido: [
      [37.3830, -5.9900], [37.3840, -5.9910], [37.3855, -5.9920],
      [37.3861, -5.9926], [37.3855, -5.9920], [37.3840, -5.9910],
      [37.3830, -5.9900]
    ]
  },
  {
    id: 'montesion',
    nombre: 'Montesión',
    nombreCompleto: 'Hermandad de Montesión',
    dia: 'jueves-santo',
    iglesia: 'Capilla de Montesión',
    barrio: 'Feria',
    horaSalida: '17:30',
    horaRecogida: '02:00',
    pasos: 2,
    descripcion: 'Hermandad dominica del barrio de la Feria. La Oración en el Huerto es su misterio principal.',
    coordsTemplo: [37.3970, -5.9930],
    recorrido: [
      [37.3970, -5.9930], [37.3950, -5.9935], [37.3920, -5.9940],
      [37.3905, -5.9945], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3905, -5.9945], [37.3950, -5.9935], [37.3970, -5.9930]
    ]
  },
  {
    id: 'quinta-angustia',
    nombre: 'Quinta Angustia',
    nombreCompleto: 'Hermandad de la Quinta Angustia',
    dia: 'jueves-santo',
    iglesia: 'Iglesia de la Magdalena',
    barrio: 'Centro',
    horaSalida: '19:30',
    horaRecogida: '23:30',
    pasos: 1,
    descripcion: 'Hermandad con sede en la monumental iglesia de la Magdalena. El Descendimiento es su paso de misterio.',
    coordsTemplo: [37.3890, -5.9985],
    recorrido: [
      [37.3890, -5.9985], [37.3885, -5.9970], [37.3880, -5.9950],
      [37.3870, -5.9935], [37.3861, -5.9926], [37.3870, -5.9935],
      [37.3885, -5.9970], [37.3890, -5.9985]
    ]
  },
  {
    id: 'el-valle',
    nombre: 'El Valle',
    nombreCompleto: 'Hermandad del Valle',
    dia: 'jueves-santo',
    iglesia: 'Iglesia de la Anunciación',
    barrio: 'Centro',
    horaSalida: '19:45',
    horaRecogida: '02:00',
    pasos: 3,
    descripcion: 'Una de las hermandades con más pasos (tres). La Virgen del Valle es de gran devoción.',
    coordsTemplo: [37.3880, -5.9905],
    recorrido: [
      [37.3880, -5.9905], [37.3878, -5.9920], [37.3875, -5.9935],
      [37.3861, -5.9926], [37.3875, -5.9935], [37.3878, -5.9920],
      [37.3880, -5.9905]
    ]
  },
  {
    id: 'pasion',
    nombre: 'Pasión',
    nombreCompleto: 'Hermandad de la Pasión',
    dia: 'jueves-santo',
    iglesia: 'Iglesia del Salvador',
    barrio: 'Centro',
    horaSalida: '20:30',
    horaRecogida: '01:30',
    pasos: 2,
    descripcion: 'Cierra el Jueves Santo. El Señor de la Pasión es una talla magistral de Martínez Montañés.',
    coordsTemplo: [37.3886, -5.9918],
    recorrido: [
      [37.3886, -5.9918], [37.3890, -5.9930], [37.3905, -5.9945],
      [37.3893, -5.9952], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3880, -5.9940], [37.3890, -5.9930], [37.3886, -5.9918]
    ]
  },

  // ==================== MADRUGÁ ====================
  {
    id: 'el-silencio',
    nombre: 'El Silencio',
    nombreCompleto: 'Hermandad del Silencio',
    dia: 'madruga',
    iglesia: 'Iglesia de San Antonio Abad',
    barrio: 'Centro',
    horaSalida: '01:00',
    horaRecogida: '06:00',
    pasos: 2,
    descripcion: 'Abre la Madrugá en absoluto silencio. La hermandad más antigua de penitencia de la ciudad, fundada a principios del siglo XIV. Sus nazarenos van en completo recogimiento.',
    coordsTemplo: [37.3935, -5.9905],
    recorrido: [
      [37.3935, -5.9905], [37.3920, -5.9920], [37.3905, -5.9945],
      [37.3893, -5.9952], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3880, -5.9940], [37.3920, -5.9920], [37.3935, -5.9905]
    ]
  },
  {
    id: 'gran-poder',
    nombre: 'Gran Poder',
    nombreCompleto: 'Hermandad del Gran Poder',
    dia: 'madruga',
    iglesia: 'Basílica del Gran Poder',
    barrio: 'San Lorenzo',
    horaSalida: '01:00',
    horaRecogida: '08:00',
    pasos: 2,
    descripcion: 'El Señor del Gran Poder es la imagen más venerada de Sevilla. Obra cumbre de Juan de Mesa (1620). Su paso por la calle Sierpes al amanecer es el momento cumbre de la Semana Santa.',
    coordsTemplo: [37.3940, -5.9990],
    recorrido: [
      [37.3940, -5.9990], [37.3930, -5.9975], [37.3915, -5.9960],
      [37.3905, -5.9945], [37.3893, -5.9952], [37.3880, -5.9940],
      [37.3861, -5.9926], [37.3880, -5.9940], [37.3915, -5.9960],
      [37.3940, -5.9990]
    ]
  },
  {
    id: 'la-macarena',
    nombre: 'La Macarena',
    nombreCompleto: 'Hermandad de la Esperanza Macarena',
    dia: 'madruga',
    iglesia: 'Basílica de la Macarena',
    barrio: 'Macarena',
    horaSalida: '00:00',
    horaRecogida: '13:30',
    pasos: 2,
    descripcion: 'La Esperanza Macarena es el icono universal de la Semana Santa de Sevilla. Su salida bajo el Arco de la Macarena es uno de los momentos más emocionantes. Millones de personas siguen su recorrido.',
    coordsTemplo: [37.3990, -5.9880],
    recorrido: [
      [37.3990, -5.9880], [37.3970, -5.9890], [37.3950, -5.9910],
      [37.3930, -5.9930], [37.3905, -5.9945], [37.3893, -5.9952],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3930, -5.9930], [37.3970, -5.9890], [37.3990, -5.9880]
    ]
  },
  {
    id: 'el-calvario',
    nombre: 'El Calvario',
    nombreCompleto: 'Hermandad del Calvario',
    dia: 'madruga',
    iglesia: 'Iglesia de la Magdalena',
    barrio: 'Centro',
    horaSalida: '04:00',
    horaRecogida: '08:00',
    pasos: 2,
    descripcion: 'Hermandad de recogimiento que procesiona en las primeras horas de la Madrugá.',
    coordsTemplo: [37.3890, -5.9985],
    recorrido: [
      [37.3890, -5.9985], [37.3885, -5.9970], [37.3880, -5.9950],
      [37.3870, -5.9935], [37.3861, -5.9926], [37.3870, -5.9935],
      [37.3885, -5.9970], [37.3890, -5.9985]
    ]
  },
  {
    id: 'esperanza-triana',
    nombre: 'Esperanza de Triana',
    nombreCompleto: 'Hermandad de la Esperanza de Triana',
    dia: 'madruga',
    iglesia: 'Capilla de los Marineros',
    barrio: 'Triana',
    horaSalida: '01:35',
    horaRecogida: '14:00',
    pasos: 2,
    descripcion: 'La gran rival de la Macarena. La Esperanza de Triana cruza el Puente de Triana en una de las estampas más icónicas de la Semana Santa. Su devoción en el barrio trianero es absoluta.',
    coordsTemplo: [37.3830, -6.0040],
    recorrido: [
      [37.3830, -6.0040], [37.3840, -6.0010], [37.3855, -5.9980],
      [37.3870, -5.9950], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3880, -5.9940], [37.3855, -5.9980], [37.3840, -6.0010],
      [37.3830, -6.0040]
    ]
  },
  {
    id: 'los-gitanos',
    nombre: 'Los Gitanos',
    nombreCompleto: 'Hermandad de los Gitanos',
    dia: 'madruga',
    iglesia: 'Capilla de los Gitanos',
    barrio: 'Centro',
    horaSalida: '02:30',
    horaRecogida: '13:45',
    pasos: 2,
    descripcion: 'Hermandad fundada para la comunidad gitana de Sevilla. Cierra la Madrugá con gran fervor y sentimiento.',
    coordsTemplo: [37.3895, -5.9870],
    recorrido: [
      [37.3895, -5.9870], [37.3890, -5.9900], [37.3880, -5.9920],
      [37.3870, -5.9935], [37.3861, -5.9926], [37.3870, -5.9935],
      [37.3890, -5.9900], [37.3895, -5.9870]
    ]
  },

  // ==================== VIERNES SANTO ====================
  {
    id: 'la-carreteria',
    nombre: 'La Carretería',
    nombreCompleto: 'Hermandad de la Carretería',
    dia: 'viernes-santo',
    iglesia: 'Capilla de la Carretería',
    barrio: 'Arenal',
    horaSalida: '15:30',
    horaRecogida: '23:00',
    pasos: 2,
    descripcion: 'Hermandad del gremio de los carreteros. Su paso del Descendimiento es muy admirado.',
    coordsTemplo: [37.3850, -5.9995],
    recorrido: [
      [37.3850, -5.9995], [37.3855, -5.9975], [37.3860, -5.9950],
      [37.3861, -5.9926], [37.3860, -5.9950], [37.3855, -5.9975],
      [37.3850, -5.9995]
    ]
  },
  {
    id: 'soledad-san-buenaventura',
    nombre: 'Soledad de San Buenaventura',
    nombreCompleto: 'Hermandad de la Soledad de San Buenaventura',
    dia: 'viernes-santo',
    iglesia: 'Convento de San Buenaventura',
    barrio: 'Centro',
    horaSalida: '18:00',
    horaRecogida: '23:30',
    pasos: 1,
    descripcion: 'Hermandad franciscana con sede junto a la Plaza de San Francisco.',
    coordsTemplo: [37.3878, -5.9945],
    recorrido: [
      [37.3878, -5.9945], [37.3875, -5.9940], [37.3870, -5.9935],
      [37.3861, -5.9926], [37.3870, -5.9935], [37.3875, -5.9940],
      [37.3878, -5.9945]
    ]
  },
  {
    id: 'el-cachorro',
    nombre: 'El Cachorro',
    nombreCompleto: 'Hermandad del Cachorro',
    dia: 'viernes-santo',
    iglesia: 'Capilla del Patrocinio',
    barrio: 'Triana',
    horaSalida: '15:45',
    horaRecogida: '02:30',
    pasos: 2,
    descripcion: 'El Cristo del Cachorro es una de las tallas más impresionantes de Sevilla. Su paso por el Puente de Triana al atardecer es un momento mítico.',
    coordsTemplo: [37.3820, -6.0050],
    recorrido: [
      [37.3820, -6.0050], [37.3830, -6.0020], [37.3845, -5.9990],
      [37.3860, -5.9960], [37.3861, -5.9926], [37.3860, -5.9960],
      [37.3830, -6.0020], [37.3820, -6.0050]
    ]
  },
  {
    id: 'la-o',
    nombre: 'La O',
    nombreCompleto: 'Hermandad de la O',
    dia: 'viernes-santo',
    iglesia: 'Iglesia de la O',
    barrio: 'Triana',
    horaSalida: '18:00',
    horaRecogida: '02:30',
    pasos: 2,
    descripcion: 'Hermandad trianera con sede junto al río Guadalquivir. La Virgen de la O es una de las grandes dolorosas de Sevilla.',
    coordsTemplo: [37.3835, -6.0030],
    recorrido: [
      [37.3835, -6.0030], [37.3840, -6.0005], [37.3850, -5.9975],
      [37.3860, -5.9950], [37.3861, -5.9926], [37.3860, -5.9950],
      [37.3840, -6.0005], [37.3835, -6.0030]
    ]
  },
  {
    id: 'san-isidoro',
    nombre: 'San Isidoro',
    nombreCompleto: 'Hermandad de San Isidoro',
    dia: 'viernes-santo',
    iglesia: 'Iglesia de San Isidoro',
    barrio: 'Centro',
    horaSalida: '19:30',
    horaRecogida: '01:00',
    pasos: 2,
    descripcion: 'Hermandad con sede en la iglesia de San Isidoro, en pleno centro de Sevilla.',
    coordsTemplo: [37.3910, -5.9925],
    recorrido: [
      [37.3910, -5.9925], [37.3905, -5.9935], [37.3895, -5.9940],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3905, -5.9935], [37.3910, -5.9925]
    ]
  },
  {
    id: 'montserrat',
    nombre: 'Montserrat',
    nombreCompleto: 'Hermandad de Montserrat',
    dia: 'viernes-santo',
    iglesia: 'Capilla de Montserrat',
    barrio: 'Centro',
    horaSalida: '20:00',
    horaRecogida: '01:00',
    pasos: 2,
    descripcion: 'Hermandad que cierra el Viernes Santo. Su paso de palio es de gran belleza.',
    coordsTemplo: [37.3895, -5.9960],
    recorrido: [
      [37.3895, -5.9960], [37.3890, -5.9950], [37.3880, -5.9940],
      [37.3861, -5.9926], [37.3880, -5.9940], [37.3890, -5.9950],
      [37.3895, -5.9960]
    ]
  },

  // ==================== SÁBADO SANTO ====================
  {
    id: 'el-sol',
    nombre: 'El Sol',
    nombreCompleto: 'Hermandad del Sol',
    dia: 'sabado-santo',
    iglesia: 'Parroquia del Sol',
    barrio: 'Triana',
    horaSalida: '12:30',
    horaRecogida: '22:30',
    pasos: 2,
    descripcion: 'Primera cofradía del Sábado Santo. Hermandad de Triana con gran arraigo en su barrio.',
    coordsTemplo: [37.3815, -6.0080],
    recorrido: [
      [37.3815, -6.0080], [37.3825, -6.0040], [37.3840, -6.0000],
      [37.3860, -5.9960], [37.3861, -5.9926], [37.3860, -5.9960],
      [37.3825, -6.0040], [37.3815, -6.0080]
    ]
  },
  {
    id: 'los-servitas',
    nombre: 'Los Servitas',
    nombreCompleto: 'Hermandad de los Servitas',
    dia: 'sabado-santo',
    iglesia: 'Iglesia de San Marcos',
    barrio: 'San Marcos',
    horaSalida: '17:30',
    horaRecogida: '21:30',
    pasos: 1,
    descripcion: 'Hermandad de silencio del Sábado Santo. La Soledad de los Servitas es una imagen de profundo recogimiento.',
    coordsTemplo: [37.3950, -5.9905],
    recorrido: [
      [37.3950, -5.9905], [37.3935, -5.9920], [37.3910, -5.9935],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3935, -5.9920], [37.3950, -5.9905]
    ]
  },
  {
    id: 'la-trinidad',
    nombre: 'La Trinidad',
    nombreCompleto: 'Hermandad de la Trinidad',
    dia: 'sabado-santo',
    iglesia: 'Iglesia de la Trinidad',
    barrio: 'María Auxiliadora',
    horaSalida: '16:00',
    horaRecogida: '02:00',
    pasos: 2,
    descripcion: 'Hermandad trinitaria con un largo recorrido desde María Auxiliadora hasta la Catedral.',
    coordsTemplo: [37.3810, -5.9830],
    recorrido: [
      [37.3810, -5.9830], [37.3830, -5.9860], [37.3850, -5.9890],
      [37.3860, -5.9920], [37.3861, -5.9926], [37.3860, -5.9920],
      [37.3830, -5.9860], [37.3810, -5.9830]
    ]
  },
  {
    id: 'santo-entierro',
    nombre: 'Santo Entierro',
    nombreCompleto: 'Hermandad del Santo Entierro',
    dia: 'sabado-santo',
    iglesia: 'Iglesia del Santo Ángel',
    barrio: 'Centro',
    horaSalida: '18:30',
    horaRecogida: '23:00',
    pasos: 4,
    descripcion: 'La cofradía oficial de Sevilla. Representa el entierro de Cristo. Es la única que lleva cuatro pasos y participan representantes de todas las hermandades.',
    coordsTemplo: [37.3880, -5.9950],
    recorrido: [
      [37.3880, -5.9950], [37.3878, -5.9940], [37.3870, -5.9935],
      [37.3861, -5.9926], [37.3870, -5.9935], [37.3878, -5.9940],
      [37.3880, -5.9950]
    ]
  },
  {
    id: 'la-soledad-san-lorenzo',
    nombre: 'La Soledad de San Lorenzo',
    nombreCompleto: 'Hermandad de la Soledad de San Lorenzo',
    dia: 'sabado-santo',
    iglesia: 'Iglesia de San Lorenzo',
    barrio: 'San Lorenzo',
    horaSalida: '18:30',
    horaRecogida: '01:00',
    pasos: 1,
    descripcion: 'Cierra la Semana Santa del Sábado Santo. La Virgen de la Soledad sale enlutada, cerrando el ciclo pasionista.',
    coordsTemplo: [37.3930, -5.9995],
    recorrido: [
      [37.3930, -5.9995], [37.3920, -5.9980], [37.3905, -5.9960],
      [37.3880, -5.9940], [37.3861, -5.9926], [37.3880, -5.9940],
      [37.3920, -5.9980], [37.3930, -5.9995]
    ]
  },

  // ==================== DOMINGO DE RESURRECCIÓN ====================
  {
    id: 'la-resurreccion',
    nombre: 'La Resurrección',
    nombreCompleto: 'Hermandad de la Resurrección',
    dia: 'domingo-resurreccion',
    iglesia: 'Iglesia de Santa Marina',
    barrio: 'Santa Marina',
    horaSalida: '08:30',
    horaRecogida: '16:30',
    pasos: 1,
    descripcion: 'La última cofradía de la Semana Santa. Procesiona la mañana del Domingo de Resurrección celebrando la victoria de Cristo sobre la muerte.',
    coordsTemplo: [37.3970, -5.9920],
    recorrido: [
      [37.3970, -5.9920], [37.3950, -5.9930], [37.3930, -5.9940],
      [37.3905, -5.9945], [37.3880, -5.9940], [37.3861, -5.9926],
      [37.3880, -5.9940], [37.3930, -5.9940], [37.3970, -5.9920]
    ]
  }
];

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SEMANA_SANTA_2026, COORDS, CARRERA_OFICIAL, DIAS, COFRADIAS };
}
