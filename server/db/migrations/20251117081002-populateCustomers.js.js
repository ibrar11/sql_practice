'use strict';

const customers = [
  {
    "CustomerName": "Alfreds Futterkiste",
    "ContactName": "Maria Anders",
    "Address": "Obere Str. 57",
    "City": "Berlin",
    "PostalCode": "12209",
    "Country": "Germany"
  },
  {
    "CustomerName": "Ana Trujillo Emparedados y helados",
    "ContactName": "Ana Trujillo",
    "Address": "Avda. de la Constitución 2222",
    "City": "México D.F.",
    "PostalCode": "05021",
    "Country": "Mexico"
  },
  {
    "CustomerName": "Antonio Moreno Taquería",
    "ContactName": "Antonio Moreno",
    "Address": "Mataderos 2312",
    "City": "México D.F.",
    "PostalCode": "05023",
    "Country": "Mexico"
  },
  {
    "CustomerName": "Around the Horn",
    "ContactName": "Thomas Hardy",
    "Address": "120 Hanover Sq.",
    "City": "London",
    "PostalCode": "WA1 1DP",
    "Country": "UK"
  },
  {
    "CustomerName": "Berglunds snabbköp",
    "ContactName": "Christina Berglund",
    "Address": "Berguvsvägen 8",
    "City": "Luleå",
    "PostalCode": "S-958 22",
    "Country": "Sweden"
  },
  {
    "CustomerName": "Blauer See Delikatessen",
    "ContactName": "Hanna Moos",
    "Address": "Forsterstr. 57",
    "City": "Mannheim",
    "PostalCode": "68306",
    "Country": "Germany"
  },
  {
    "CustomerName": "Blondel père et fils",
    "ContactName": "Frédérique Citeaux",
    "Address": "24, place Kléber",
    "City": "Strasbourg",
    "PostalCode": "67000",
    "Country": "France"
  },
  {
    "CustomerName": "Bólido Comidas preparadas",
    "ContactName": "Martín Sommer",
    "Address": "C/ Araquil, 67",
    "City": "Madrid",
    "PostalCode": "28023",
    "Country": "Spain"
  },
  {
    "CustomerName": "Bon app'",
    "ContactName": "Laurence Lebihans",
    "Address": "12, rue des Bouchers",
    "City": "Marseille",
    "PostalCode": "13008",
    "Country": "France"
  },
  {
    "CustomerName": "Bottom-Dollar Marketse",
    "ContactName": "Elizabeth Lincoln",
    "Address": "23 Tsawassen Blvd.",
    "City": "Tsawassen",
    "PostalCode": "T2F 8M4",
    "Country": "Canada"
  },
  {
    "CustomerName": "B's Beverages",
    "ContactName": "Victoria Ashworth",
    "Address": "Fauntleroy Circus",
    "City": "London",
    "PostalCode": "EC2 5NT",
    "Country": "UK"
  },
  {
    "CustomerName": "Cactus Comidas para llevar",
    "ContactName": "Patricio Simpson",
    "Address": "Cerrito 333",
    "City": "Buenos Aires",
    "PostalCode": "1010",
    "Country": "Argentina"
  },
  {
    "CustomerName": "Centro comercial Moctezuma",
    "ContactName": "Francisco Chang",
    "Address": "Sierras de Granada 9993",
    "City": "México D.F.",
    "PostalCode": "05022",
    "Country": "Mexico"
  },
  {
    "CustomerName": "Chop-suey Chinese",
    "ContactName": "Yang Wang",
    "Address": "Hauptstr. 29",
    "City": "Bern",
    "PostalCode": "3012",
    "Country": "Switzerland"
  },
  {
    "CustomerName": "Comércio Mineiro",
    "ContactName": "Pedro Afonso",
    "Address": "Av. dos Lusíadas, 23",
    "City": "São Paulo",
    "PostalCode": "05432-043",
    "Country": "Brazil"
  },
  {
    "CustomerName": "Consolidated Holdings",
    "ContactName": "Elizabeth Brown",
    "Address": "Berkeley Gardens 12 Brewery",
    "City": "London",
    "PostalCode": "WX1 6LT",
    "Country": "UK"
  },
  {
    "CustomerName": "Drachenblut Delikatessend",
    "ContactName": "Sven Ottlieb",
    "Address": "Walserweg 21",
    "City": "Aachen",
    "PostalCode": "52066",
    "Country": "Germany"
  },
  {
    "CustomerName": "Du monde entier",
    "ContactName": "Janine Labrune",
    "Address": "67, rue des Cinquante Otages",
    "City": "Nantes",
    "PostalCode": "44000",
    "Country": "France"
  },
  {
    "CustomerName": "Eastern Connection",
    "ContactName": "Ann Devon",
    "Address": "35 King George",
    "City": "London",
    "PostalCode": "WX3 6FW",
    "Country": "UK"
  },
  {
    "CustomerName": "Ernst Handel",
    "ContactName": "Roland Mendel",
    "Address": "Kirchgasse 6",
    "City": "Graz",
    "PostalCode": "8010",
    "Country": "Austria"
  },
  {
    "CustomerName": "Familia Arquibaldo",
    "ContactName": "Aria Cruz",
    "Address": "Rua Orós, 92",
    "City": "São Paulo",
    "PostalCode": "05442-030",
    "Country": "Brazil"
  },
  {
    "CustomerName": "FISSA Fabrica Inter. Salchichas S.A.",
    "ContactName": "Diego Roel",
    "Address": "C/ Moralzarzal, 86",
    "City": "Madrid",
    "PostalCode": "28034",
    "Country": "Spain"
  },
  {
    "CustomerName": "Folies gourmandes",
    "ContactName": "Martine Rancé",
    "Address": "184, chaussée de Tournai",
    "City": "Lille",
    "PostalCode": "59000",
    "Country": "France"
  },
  {
    "CustomerName": "Folk och fä HB",
    "ContactName": "Maria Larsson",
    "Address": "Åkergatan 24",
    "City": "Bräcke",
    "PostalCode": "S-844 67",
    "Country": "Sweden"
  },
  {
    "CustomerName": "Frankenversand",
    "ContactName": "Peter Franken",
    "Address": "Berliner Platz 43",
    "City": "München",
    "PostalCode": "80805",
    "Country": "Germany"
  },
  {
    "CustomerName": "France restauration",
    "ContactName": "Carine Schmitt",
    "Address": "54, rue Royale",
    "City": "Nantes",
    "PostalCode": "44000",
    "Country": "France"
  },
  {
    "CustomerName": "Franchi S.p.A.",
    "ContactName": "Paolo Accorti",
    "Address": "Via Monte Bianco 34",
    "City": "Torino",
    "PostalCode": "10100",
    "Country": "Italy"
  },
  {
    "CustomerName": "Furia Bacalhau e Frutos do Mar",
    "ContactName": "Lino Rodriguez",
    "Address": "Jardim das rosas n. 32",
    "City": "Lisboa",
    "PostalCode": "1675",
    "Country": "Portugal"
  },
  {
    "CustomerName": "Galería del gastrónomo",
    "ContactName": "Eduardo Saavedra",
    "Address": "Rambla de Cataluña, 23",
    "City": "Barcelona",
    "PostalCode": "08022",
    "Country": "Spain"
  },
  {
    "CustomerName": "Godos Cocina Típica",
    "ContactName": "José Pedro Freyre",
    "Address": "C/ Romero, 33",
    "City": "Sevilla",
    "PostalCode": "41101",
    "Country": "Spain"
  },
  {
    "CustomerName": "Gourmet Lanchonetes",
    "ContactName": "André Fonseca",
    "Address": "Av. Brasil, 442",
    "City": "Campinas",
    "PostalCode": "04876-786",
    "Country": "Brazil"
  },
  {
    "CustomerName": "Great Lakes Food Market",
    "ContactName": "Howard Snyder",
    "Address": "2732 Baker Blvd.",
    "City": "Eugene",
    "PostalCode": "97403",
    "Country": "USA"
  },
  {
    "CustomerName": "GROSELLA-Restaurante",
    "ContactName": "Manuel Pereira",
    "Address": "5ª Ave. Los Palos Grandes",
    "City": "Caracas",
    "PostalCode": "1081",
    "Country": "Venezuela"
  },
  {
    "CustomerName": "Hanari Carnes",
    "ContactName": "Mario Pontes",
    "Address": "Rua do Paço, 67",
    "City": "Rio de Janeiro",
    "PostalCode": "05454-876",
    "Country": "Brazil"
  },
  {
    "CustomerName": "HILARIÓN-Abastos",
    "ContactName": "Carlos Hernández",
    "Address": "Carrera 22 con Ave. Carlos Soublette #8-35",
    "City": "San Cristóbal",
    "PostalCode": "5022",
    "Country": "Venezuela"
  },
  {
    "CustomerName": "Hungry Coyote Import Store",
    "ContactName": "Yoshi Latimer",
    "Address": "City Center Plaza 516 Main St.",
    "City": "Elgin",
    "PostalCode": "97827",
    "Country": "USA"
  },
  {
    "CustomerName": "Hungry Owl All-Night Grocers",
    "ContactName": "Patricia McKenna",
    "Address": "8 Johnstown Road",
    "City": "Cork",
    "PostalCode": "",
    "Country": "Ireland"
  },
  {
    "CustomerName": "Island Trading",
    "ContactName": "Helen Bennett",
    "Address": "Garden House Crowther Way",
    "City": "Cowes",
    "PostalCode": "PO31 7PJ",
    "Country": "UK"
  },
  {
    "CustomerName": "Königlich Essen",
    "ContactName": "Philip Cramer",
    "Address": "Maubelstr. 90",
    "City": "Brandenburg",
    "PostalCode": "14776",
    "Country": "Germany"
  },
  {
    "CustomerName": "La corne d'abondance",
    "ContactName": "Daniel Tonini",
    "Address": "67, avenue de l'Europe",
    "City": "Versailles",
    "PostalCode": "78000",
    "Country": "France"
  },
  {
    "CustomerName": "La maison d'Asie",
    "ContactName": "Annette Roulet",
    "Address": "1 rue Alsace-Lorraine",
    "City": "Toulouse",
    "PostalCode": "31000",
    "Country": "France"
  },
  {
    "CustomerName": "Laughing Bacchus Wine Cellars",
    "ContactName": "Yoshi Tannamuri",
    "Address": "1900 Oak St.",
    "City": "Vancouver",
    "PostalCode": "V3F 2K1",
    "Country": "Canada"
  },
  {
    "CustomerName": "Lazy K Kountry Store",
    "ContactName": "John Steel",
    "Address": "12 Orchestra Terrace",
    "City": "Walla Walla",
    "PostalCode": "99362",
    "Country": "USA"
  },
  {
    "CustomerName": "Lehmanns Marktstand",
    "ContactName": "Renate Messner",
    "Address": "Magazinweg 7",
    "City": "Frankfurt a.M.",
    "PostalCode": "60528",
    "Country": "Germany"
  },
  {
    "CustomerName": "Let's Stop N Shop",
    "ContactName": "Jaime Yorres",
    "Address": "87 Polk St. Suite 5",
    "City": "San Francisco",
    "PostalCode": "94117",
    "Country": "USA"
  },
  {
    "CustomerName": "LILA-Supermercado",
    "ContactName": "Carlos González",
    "Address": "Carrera 52 con Ave. Bolívar #65-98 Llano Largo",
    "City": "Barquisimeto",
    "PostalCode": "3508",
    "Country": "Venezuela"
  },
  {
    "CustomerName": "LINO-Delicateses",
    "ContactName": "Felipe Izquierdo",
    "Address": "Ave. 5 de Mayo Porlamar",
    "City": "I. de Margarita",
    "PostalCode": "4980",
    "Country": "Venezuela"
  },
  {
    "CustomerName": "Lonesome Pine Restaurant",
    "ContactName": "Fran Wilson",
    "Address": "89 Chiaroscuro Rd.",
    "City": "Portland",
    "PostalCode": "97219",
    "Country": "USA"
  },
  {
    "CustomerName": "Magazzini Alimentari Riuniti",
    "ContactName": "Giovanni Rovelli",
    "Address": "Via Ludovico il Moro 22",
    "City": "Bergamo",
    "PostalCode": "24100",
    "Country": "Italy"
  },
  {
    "CustomerName": "Maison Dewey",
    "ContactName": "Catherine Dewey",
    "Address": "Rue Joseph-Bens 532",
    "City": "Bruxelles",
    "PostalCode": "B-1180",
    "Country": "Belgium"
  },
  {
    "CustomerName": "Mère Paillarde",
    "ContactName": "Jean Fresnière",
    "Address": "43 rue St. Laurent",
    "City": "Montréal",
    "PostalCode": "H1J 1C3",
    "Country": "Canada"
  },
  {
    "CustomerName": "Morgenstern Gesundkost",
    "ContactName": "Alexander Feuer",
    "Address": "Heerstr. 22",
    "City": "Leipzig",
    "PostalCode": "04179",
    "Country": "Germany"
  },
  {
    "CustomerName": "North/South",
    "ContactName": "Simon Crowther",
    "Address": "South House 300 Queensbridge",
    "City": "London",
    "PostalCode": "SW7 1RZ",
    "Country": "UK"
  },
  {
    "CustomerName": "Océano Atlántico Ltda.",
    "ContactName": "Yvonne Moncada",
    "Address": "Ing. Gustavo Moncada 8585 Piso 20-A",
    "City": "Buenos Aires",
    "PostalCode": "1010",
    "Country": "Argentina"
  },
  {
    "CustomerName": "Old World Delicatessen",
    "ContactName": "Rene Phillips",
    "Address": "2743 Bering St.",
    "City": "Anchorage",
    "PostalCode": "99508",
    "Country": "USA"
  },
  {
    "CustomerName": "Ottilies Käseladen",
    "ContactName": "Henriette Pfalzheim",
    "Address": "Mehrheimerstr. 369",
    "City": "Köln",
    "PostalCode": "50739",
    "Country": "Germany"
  },
  {
    "CustomerName": "Paris spécialités",
    "ContactName": "Marie Bertrand",
    "Address": "265, boulevard Charonne",
    "City": "Paris",
    "PostalCode": "75012",
    "Country": "France"
  },
  {
    "CustomerName": "Pericles Comidas clásicas",
    "ContactName": "Guillermo Fernández",
    "Address": "Calle Dr. Jorge Cash 321",
    "City": "México D.F.",
    "PostalCode": "05033",
    "Country": "Mexico"
  },
  {
    "CustomerName": "Piccolo und mehr",
    "ContactName": "Georg Pipps",
    "Address": "Geislweg 14",
    "City": "Salzburg",
    "PostalCode": "5020",
    "Country": "Austria"
  },
  {
    "CustomerName": "Princesa Isabel Vinhoss",
    "ContactName": "Isabel de Castro",
    "Address": "Estrada da saúde n. 58",
    "City": "Lisboa",
    "PostalCode": "1756",
    "Country": "Portugal"
  },
  {
    CustomerName: "Que Delícia",
    ContactName: "Bernardo Batista",
    Address: "Rua da Panificadora, 12",
    City: "Rio de Janeiro",
    PostalCode: "02389-673",
    Country: "Brazil"
  },
  {
    CustomerName: "Queen Cozinha",
    ContactName: "Lúcia Carvalho",
    Address: "Alameda dos Canàrios, 891",
    City: "São Paulo",
    PostalCode: "05487-020",
    Country: "Brazil"
  },
  {
    CustomerName: "QUICK-Stop",
    ContactName: "Horst Kloss",
    Address: "Taucherstraße 10",
    City: "Cunewalde",
    PostalCode: "01307",
    Country: "Germany"
  },
  {
    CustomerName: "Rancho grande",
    ContactName: "Sergio Gutiérrez",
    Address: "Av. del Libertador 900",
    City: "Buenos Aires",
    PostalCode: "1010",
    Country: "Argentina"
  },
  {
    CustomerName: "Rattlesnake Canyon Grocery",
    ContactName: "Paula Wilson",
    Address: "2817 Milton Dr.",
    City: "Albuquerque",
    PostalCode: "87110",
    Country: "USA"
  },
  {
    CustomerName: "Reggiani Caseifici",
    ContactName: "Maurizio Moroni",
    Address: "Strada Provinciale 124",
    City: "Reggio Emilia",
    PostalCode: "42100",
    Country: "Italy"
  },
  {
    CustomerName: "Ricardo Adocicados",
    ContactName: "Janete Limeira",
    Address: "Av. Copacabana, 267",
    City: "Rio de Janeiro",
    PostalCode: "02389-890",
    Country: "Brazil"
  },
  {
    CustomerName: "Richter Supermarkt",
    ContactName: "Michael Holz",
    Address: "Grenzacherweg 237",
    City: "Genève",
    PostalCode: "1203",
    Country: "Switzerland"
  },
  {
    CustomerName: "Romero y tomillo",
    ContactName: "Alejandra Camino",
    Address: "Gran Vía, 1",
    City: "Madrid",
    PostalCode: "28001",
    Country: "Spain"
  },
  {
    CustomerName: "Santé Gourmet",
    ContactName: "Jonas Bergulfsen",
    Address: "Erling Skakkes gate 78",
    City: "Stavern",
    PostalCode: "4110",
    Country: "Norway"
  },
  {
    CustomerName: "Save-a-lot Markets",
    ContactName: "Jose Pavarotti",
    Address: "187 Suffolk Ln.",
    City: "Boise",
    PostalCode: "83720",
    Country: "USA"
  },
  {
    CustomerName: "Seven Seas Imports",
    ContactName: "Hari Kumar",
    Address: "90 Wadhurst Rd.",
    City: "London",
    PostalCode: "OX15 4NB",
    Country: "UK"
  },
  {
    CustomerName: "Simons bistro",
    ContactName: "Jytte Petersen",
    Address: "Vinbæltet 34",
    City: "København",
    PostalCode: "1734",
    Country: "Denmark"
  },
  {
    CustomerName: "Spécialités du monde",
    ContactName: "Dominique Perrier",
    Address: "25, rue Lauriston",
    City: "Paris",
    PostalCode: "75016",
    Country: "France"
  },
  {
    CustomerName: "Split Rail Beer & Ale",
    ContactName: "Art Braunschweiger",
    Address: "P.O. Box 555",
    City: "Lander",
    PostalCode: "82520",
    Country: "USA"
  },
  {
    CustomerName: "Suprêmes délices",
    ContactName: "Pascale Cartrain",
    Address: "Boulevard Tirou, 255",
    City: "Charleroi",
    PostalCode: "B-6000",
    Country: "Belgium"
  },
  {
    CustomerName: "The Big Cheese",
    ContactName: "Liz Nixon",
    Address: "89 Jefferson Way Suite 2",
    City: "Portland",
    PostalCode: "97201",
    Country: "USA"
  },
  {
    CustomerName: "The Cracker Box",
    ContactName: "Liu Wong",
    Address: "55 Grizzly Peak Rd.",
    City: "Butte",
    PostalCode: "59801",
    Country: "USA"
  },
  {
    CustomerName: "Toms Spezialitäten",
    ContactName: "Karin Josephs",
    Address: "Luisenstr. 48",
    City: "Münster",
    PostalCode: "44087",
    Country: "Germany"
  },
  {
    CustomerName: "Tortuga Restaurante",
    ContactName: "Miguel Angel Paolino",
    Address: "Avda. Azteca 123",
    City: "México D.F.",
    PostalCode: "05033",
    Country: "Mexico"
  },
  {
    CustomerName: "Tradição Hipermercados",
    ContactName: "Anabela Domingues",
    Address: "Av. Inês de Castro, 414",
    City: "São Paulo",
    PostalCode: "05634-030",
    Country: "Brazil"
  },
  {
    CustomerName: "Trail's Head Gourmet Provisioners",
    ContactName: "Helvetius Nagy",
    Address: "722 DaVinci Blvd.",
    City: "Kirkland",
    PostalCode: "98034",
    Country: "USA"
  },
  {
    CustomerName: "Vaffeljernet",
    ContactName: "Palle Ibsen",
    Address: "Smagsløget 45",
    City: "Århus",
    PostalCode: "8200",
    Country: "Denmark"
  },
  {
    CustomerName: "Victuailles en stock",
    ContactName: "Mary Saveley",
    Address: "2, rue du Commerce",
    City: "Lyon",
    PostalCode: "69004",
    Country: "France"
  },
  {
    CustomerName: "Vins et alcools Chevalier",
    ContactName: "Paul Henriot",
    Address: "59 rue de l'Abbaye",
    City: "Reims",
    PostalCode: "51100",
    Country: "France"
  },
  {
    CustomerName: "Die Wandernde Kuh",
    ContactName: "Rita Müller",
    Address: "Adenauerallee 900",
    City: "Stuttgart",
    PostalCode: "70563",
    Country: "Germany"
  },
  {
    CustomerName: "Wartian Herkku",
    ContactName: "Pirkko Koskitalo",
    Address: "Torikatu 38",
    City: "Oulu",
    PostalCode: "90110",
    Country: "Finland"
  },
  {
    CustomerName: "Wellington Importadora",
    ContactName: "Paula Parente",
    Address: "Rua do Mercado, 12",
    City: "Resende",
    PostalCode: "08737-363",
    Country: "Brazil"
  },
  {
    CustomerName: "White Clover Markets",
    ContactName: "Karl Jablonski",
    Address: "305 - 14th Ave. S. Suite 3B",
    City: "Seattle",
    PostalCode: "98128",
    Country: "USA"
  },
  {
    CustomerName: "Wilman Kala",
    ContactName: "Matti Karttunen",
    Address: "Keskuskatu 45",
    City: "Helsinki",
    PostalCode: "21240",
    Country: "Finland"
  },
  {
    CustomerName: "Wolski",
    ContactName: "Zbyszek",
    Address: "ul. Filtrowa 68",
    City: "Walla",
    PostalCode: "01-012",
    Country: "Poland"
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Customers","PostalCode",{
      type: Sequelize.STRING
    })
    await queryInterface.bulkInsert("Customers", customers, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Customers","PostalCode",{
      type: Sequelize.INTEGER
    })
    await queryInterface.bulkDelete("Customers", null, {});
  }
};
