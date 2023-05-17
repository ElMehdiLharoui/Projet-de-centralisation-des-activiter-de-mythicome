##  // ajouter club 
    {
    "name": "tournoitfoot",
    "listEvent": []
    }
# // addEvent de club <http://localhost:8083/Club/Aid=idclub> Patch
    { "listEvent": [
        "645a50c58f97e47f64802822" // id Evenet  
        ]
    }
# // RemoveEvent de club <http://localhost:8083/Club/Rid=idclub> Patch
    { "listEvent": [
        "645a50c58f97e47f64802822" // id Evenet  
        ]
    }
#  getALL<http://localhost:8083/Club/>  GET   
# update ou Delete ou getByiD<http://localhost:8083/Club/id=idclub> Delete ou Patch ou GEt
# Ajoute Event <http://localhost:8083/Event/> Post
    {
    name: "test",
    description: "tesssssssstt",
    clubName: "645a633d26e87bed798113d9", // id club
      ville: "casa",
      paticipentMax: 50,
    startTime: "2014-04-30T00:00:00.000+00:00",
     endTime: "2014-04-30T00:00:00.000+00:00",
    dateFinal: "2014-04-30T00:00:00.000+00:00",
     Image: file,
    }
# update ou Delete ou getByiD<http://localhost:8083/Event/id=idEvent> Delete ou Patch ou GEt
# addParticpent <http://localhost:8083/Event/Aid=idEvent> Patch ou RemoveParticpent <http://localhost:8083/Event/Rid=idEvent> Patch
    {
     "listParticipent":[
        "645a633d26e87bed798113d9"
     ]
    }
# // ajoute commande  <http://localhost:8083/Commande/> Post
    {
    "user":"645a633d26e87bed798113d9", 
    "listOrder": [
        { "nom": "Produit 00", "quantite": 9999 },
        { "nom": "Produit 2", "quantite": 10 }
    ],
    "Statut":"EN_COUR" ou "LIVRER",
    "DateOreder" : "2014-04-30T00:00:00.000+00:00"
    }
#  getALL<http://localhost:8083/Commande/>  GET     
#  getByUSER<http://localhost:8083/Commande/id=ID_USER>  GET     
# update ou Delete ou getByiD <http://localhost:8083/Commande/id=idclub> Delete ou Patch ou GEt

  # ajout Formation <http://localhost:8083/Formation/> Post
    {
    "name": "Spring",
    "Formateur": "Lhaorui",
    "startTime": "2014-04-30T00:00:00.000+00:00",
    "endTime": "2014-04-30T00:00:00.000+00:00"
    }  
# update ou Delete <http://localhost:8083/Formation/id=645a50c58f97e47f64802822> Delete ou Patch 
#  getALL<http://localhost:8083/Formation/>  GET     
# addParticpent <http://localhost:8083/Formation/Aid=idEvent> Patch ou RemoveParticpent <http://localhost:8083/Formation/Rid=idEvent> patch
    {
     "listParticipent":[
        "645a633d26e87bed798113d9"
     ]
    }
# ajout Menu <http://localhost:8083/Menu/> Post
    {
    plat: "test",
    price: 10,
    description: "fffffffffffffff",
    Image: file,
    vitamines: "aa","ddd"
    typePlat: "DEJUENER"ou"PETIT_DEJENER"ou "DINER",
    }
# update ou Delete <http://localhost:8083/Menu/id=Menu> Delete ou Patch 
#  getALL<http://localhost:8083/Menu/>  GET     


# add  USER   <http://localhost:8083/user/> Post
    {
    "email": "zakaria@gamil.",
    "password":"123456"
    }
#  getALL<http://localhost:8083/user/>  GET     
# update ou Delete ou getByiD <http://localhost:8083/user/id=iduser> Delete ou Patch ou GEt