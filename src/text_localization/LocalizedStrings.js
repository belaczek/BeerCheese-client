import LocalizedStrings from 'react-localization';

export default new LocalizedStrings({
  cs: {
    WelcomeWarningPopUp: {
      message: 'Pokračováním potvrzuji, že jsem starší 18 let',
      okBtn: 'Pokračovat'
    },
    NavBar: {
      aboutUs: 'O nás',
      terms: 'Obchodní podmínky',
      contact: 'Kontakt',
      mainPage: 'Produkty',
      logIn: 'Přihlásit',
      signUp: 'Registrace',
      logOut: 'Odhlásit',
      customers: 'Zákazníci',
      suppliers: 'Dodavatelé',
      products: 'Produkty',
      orders: 'Objednávky',
      packagesOverview: 'Přehled balíčků',
      createPackage: 'Vytvořit balíček'
    },
    PackageCreationNav: {
      back: 'Zpět',
      next: 'Další',
      beer: 'Pivo',
      supplements: 'Doplňky',
      packages: 'Balení',
      message: 'Vzkaz',
      summary: 'Shrnutí'
    },
    PackageOverviewNav: {
      back: 'Zpět',
      next: 'Další',
      packages: 'Balíčky',
      delPay: 'Doprava/Platba',
      delDetails: 'Doručovací údaje',
      summary: 'Shrnutí'
    },
    PackageOverview: {
      packages: {
        edit: 'Upravit',
        remove: 'Odebrat',
      },
      delPay: {
        selectDelivery: 'Vyberte dopravu',
        selectPayment: 'Vyberte platbu',
      },
      deliveryDetails: {
        contacts: 'Kontaktní údaje',
        firstName: 'Jméno',
        lastName: 'Příjmení',
        email: 'Váš email',
        phone: 'Telefon',
        street: 'Ulice č. p.',
        city: 'Město',
        zip: 'PSČ',
        register: 'Registrovat účet',
        differentInvoiceContact: 'Kontaktní údaje se neshodují s fakturačními',
        differentDeliveryContact: 'Kontaktní údaje se neshodují s doručovacími',
        agree: 'Potvrzuji, že je mi více než 18 let a souhlasím s obchodními podmínkami',
      },
      summary: {
        personal: 'Osobní údaje',
        delivery: 'Doprava',
        payment: 'Platba',
        packages: 'Balíčky',
      },
      priceCalculation: {
        title: 'Sečteno a podtrženo',
        delivery: 'Doprava',
        payment: 'Platba',
        packages: 'Balíčky',
        total: 'Cena celkem',
      },
    },
    NavPanel: {
      pageName: 'Pivní suvenýry',
      amount: 'Počet',
      price: 'Cena'
    },
    HomePage: {
      categories: 'Kategorie',
      beer: 'Pivo',
      supplements: 'Doplňky',
      createPackage: 'Vytvořit balíček',
      previous: 'Předchozí',
      next: 'Další'
    },
    Product: {
      btnAddToChart: 'Přidat do košíku'
    },
    AdminCustomersPage: {
      id: 'ID',
      name: 'Jméno',
      surname: 'Příjmení',
      email: 'Email'
    },
    AdminOrdersPage: {
      id: 'ID',
      customer: 'Zákazník',
      email: 'Email',
      state: 'Stav'
    },
    AdminProductsPage: {
      id: 'ID',
      name: 'Název',
      category: 'Kategorie',
      price: 'Cena',
      supplier: 'Dodavatel',
      btnAddProduct: 'Přidat produkt'
    },
    AdminSuppliersPage: {
      id: 'ID',
      name: 'Název',
      email: 'Email',
      btnAddSupplier: 'Přidat dodavatele'
    },
    admin: {
      pageName: 'Pivní suvenýry administrace'
    },
    logIn: {
      title: 'Přihlášení',
      name: 'Jméno',
      mandatoryField: 'Políčko je povinné',
      pass: 'Heslo',
      btnSignIn: 'Přihlásit',
      waiting: 'Čekejte prosím',
      error: 'Chyba přihlášení'
<<<<<<< HEAD
    },
    registration: {
      title: 'Registrace',
      username: 'Uživatelské jméno',
      password: 'Heslo',
      firstname: 'Jméno',
      lastname: 'Přijmení',
      birthdate: 'Datum narození',
      phone: 'Telefon',
      email: 'E-Mail',
      question: 'Bezpečnostní otázka',
      answer: 'Bezpečnostní odpověď',
      register: 'Registrovat'
=======
>>>>>>> 5987057d853c2fba3195aef52a66d0f2552a6df8
    },
    categories: {
      black: 'Černé',
      lager: 'Ležák',
      glass: 'Sklo',
      beerMat: 'Podtácky'
    },
    boiledEgg: 'Uovo sodo',
    softBoiledEgg: 'Uovo alla coque',
    choice: "Come scegliere l'uovo"
  }
});
