/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 
Your name : Gaby Pombo  
Date :  
Contact information : 
What does this script do ? 
...
*/

// Your scripting goes here...

function addElement(){
        let newSvg = document.createElement("svg");
        newSvg.setAttribute("id", "dimple2")
        let newText = document.createTextNode("Inserer ici le graphique1")
        newSvg.appendChild(newText);
        let currentDiv = document.getElementById('table1');
        currentDiv.parentNode.insertBefore(newSvg, currentDiv);
         let divDeux = document.createElement("svg");
         let newTextDeux = document.createTextNode("Inserer ici le graphique2")
         divDeux.appendChild(newTextDeux);
        let courantDiv = document.getElementById('table2');
         courantDiv.parentNode.insertBefore(divDeux, courantDiv);
    
      }
    
    
    ///////////////// GRAPH EN JSON + TOUTES LES SECONDES ////////////
    
    
    const constDiv = function bow(creaDiv, target){
        const div = document.createElement('div');
        div.id = creaDiv;
        target.insertAdjacentElement('beforebegin', div);
    }
    
    constDiv('graph1', bodyContent);
        
        //graphique 1
        const graph = []
        const svg = dimple.newSvg("#graph1", "100%", 450);//taille du graphique
        let chart = new dimple.chart(svg, graph);//ce qu'il va traiter
        chart.addCategoryAxis("x", "Countries and Years");
        chart.addMeasureAxis("y", "Data");
        chart.addSeries(null, dimple.plot.scatter);//type de graphique
    
        let firstGraphic = async() => {

        try {
            const request   = await fetch("https://inside.becode.org/api/v1/data/random.json");
            const dataOnline = await request.json()
            
        }catch (error){
            console.error(error); 
        }
            let request =  new XMLHttpRequest;
            request.open('GET', 'https://inside.becode.org/api/v1/data/random.json', true);
            request.onload = function() {
                if (this.status === 200) { 
                source = JSON.parse(this.responseText);
    
                for (i=0;i<source.length;i++){
                    let content = {"Countries and Years":source[i][0], "Data":source[i][1]};
                    graph.push(content);
                    console.log(graph);
                }
                chart.draw();
                setInterval(firstGraphic, 8000);//Mis à jour toutes les secondes
                }
            }
            request.send();
        }
        
       
      

         function testdeux(){
            let table2 = document.getElementById('table2');
        let divGraphique2 = document.createElement("div");

        divGraphique2.id="dimple2";
            
            table2.parentNode.insertBefore(divGraphique2,table2);
            
        //récupération des donnees et création d'un tableau:
            //source des donnees de table2
                let tbody2 = table2.getElementsByTagName("tbody");
                let tr2 = tbody2[0].getElementsByTagName("tr");
            //tableau de donnees:
                let donnees2=[];
                let fonctionTableau2=()=>{
                    for (i=1;i<tr2.length;i++){ //i=1 ne garde pas les donnees du n° de pays
                        let pays=[];
                        let th2 = tr2[i].getElementsByTagName("th");
                        let div2 = th2[0].getElementsByTagName("div");
                        let number2 = div2[0].innerHTML;
                        pays.push(number2);
                        let td2 = tr2[i].getElementsByTagName("td");
                            for (y=0;y<td2.length;y++){
                                let contenu2 = td2[y].innerHTML;
                                if(contenu2 != ":"){
                                    pays.push(contenu2);
                                }
                            }
                        donnees2.push(pays);
                    }
                }
                fonctionTableau2();
                // console.log(donnees2);
                
        //conception du graphique via dimple (attention ajout du script dimple dans l'HTML)
        let svg2 = dimple.newSvg('#dimple2', 700, 650);
        
        let data2 = [];
        for (i=0;i<donnees2.length;i++){
        for (let y=2;y<4;y++){
            let dataContent2 = {"Année":y, "Population":donnees2[i][y], "Pays":donnees2[i][1]};
            if(dataContent2.Année == 2){
            dataContent2.Année = "2007-09";
            }else if (dataContent2.Année == 3){
            dataContent2.Année = "2010-12";
            }
            data2.push(dataContent2);
        }
        }

        let chart2 = new dimple.chart(svg2, data2);
        chart2.addCategoryAxis("x", "Année");
        chart2.addMeasureAxis("y", "Population");
        chart2.addSeries("Pays", dimple.plot.bar);
        chart2.addLegend(80, 10, 500, 120, "right");
        chart2.setBounds('50px', "150px", "80%", "70%"); 
        chart2.draw();
         }
           
    
    
    ////// EN HAUT FIN //////
    
    
    
    
    (()=>{
        
          
            addElement();
            //premierGraphique()

    // test dimple 2
        testdeux();
    
        ///////////// RECUPERATIONS DES DONNEES ///////////////
          
                const tableau1 = document.getElementById('table1');
                const tableau1_lignes = tableau1.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                //console.log(tableau1_lignes[0]); //celui qui correspond aux dates
                for(const ligne of tableau1_lignes){
                    console.log(ligne.innerHTML); 
                }
    
                const tableau2 = document.getElementById('table2');
                const tableau2_lignes = tableau2.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
               
                for(const ligne of tableau2_lignes){
                    console.log(ligne.innerHTML); 
                }
        
             firstGraphic();
    
        
       
    })();
    