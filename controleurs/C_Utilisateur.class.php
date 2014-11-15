<?php

class C_Utilisateur extends C_ControleurGenerique {

    /**
     * préparation et affichage des coordonnées de l'utilisateur courant
     */
    function coordonnees() {
        $this->vue = new V_Vue("../vues/templates/template.inc.php");
        $this->vue->ecrireDonnee('titreVue', 'Vos informations');
        // charger les coordonnées de l'utilisateur connecté depuis la BDD       
        $daoPers = new M_DaoPersonne();
        $daoPers->connecter();
        $utilisateur = $daoPers->getOneByLogin(MaSession::get('login'));
        $daoPers->deconnecter();
        $this->vue->ecrireDonnee('utilisateur', $utilisateur);
        // transmettre le login        
        $this->vue->ecrireDonnee('loginAuthentification', MaSession::get('login'));
        // vue centrale à inclure
        $this->vue->ecrireDonnee('centre', "../vues/includes/utilisateur/centreAfficherMesInformationsFormulaire.inc.php");
        $this->vue->afficher();
    }

    /**
     *  modification des coordonnées de l'utilisateur courant
     */
    function modifierCoordonnees() {
        $this->vue = new V_Vue("../vues/templates/template.inc.php");
        $this->vue->ecrireDonnee('titreVue', 'Modification de vos informations');
        // charger les coordonnées de l'utilisateur connecté depuis la BDD       
        $daoPers = new M_DaoPersonne();
        $daoPers->connecter();
        $utilisateur = $daoPers->getOneByLogin(MaSession::get('login'));
        $daoPers->deconnecter();
        $this->vue->ecrireDonnee('utilisateur', $utilisateur);
        // transmettre le login        
        $this->vue->ecrireDonnee('loginAuthentification', MaSession::get('login'));

        $this->vue->ecrireDonnee('centre', "../vues/includes/utilisateur/centreModifierMesInformationsFormulaire.inc.php");
        $this->vue->afficher();
    }

    //validation de modification des donnée personelle à l'utilisateur
    function validerModifierCoordonnees() {
        $this->vue = new V_Vue("../vues/templates/template.inc.php");
        $this->vue->ecrireDonnee('titreVue', "Modification de vos informations");
        $this->vue->ecrireDonnee('centre',"../vues/includes/utilisateur/centreValiderModifierMesInformations.inc.php");
        $daoPers = new M_DaoPersonne();
        $daoPers->connecter();
        // récupérer les données du formulaire l'identifiant de l'utilisateur courant
        $id = $_GET["id"];

        // charger l'objet métier correspondant à l'utilisateur courant
//        $utilisateur = $daoPers->getOneByLoginEager($id);
        $utilisateur = $daoPers->getOneById($id);
//        var_dump($utilisateur);
        // mettre à jour l'objet métier d'après le formilaire de saisie
        $utilisateur->setCivilite($_POST["civilite"]);
        $utilisateur->setNom($_POST["nom"]);
        $utilisateur->setPrenom($_POST["prenom"]);
        $utilisateur->setNumTel($_POST["tel"]);
        $utilisateur->setMail($_POST["mail"]);
        if (MaSession::get('role') == 4) {
            $utilisateur->setEtudes($_POST["etudes"]);
            $utilisateur->setFormation($_POST["formation"]);
        }
        $ok = $daoPers->update($id, $utilisateur);
        if ($ok) {
            $this->vue->ecrireDonnee('message',"Modifications enregistr&eacute;es");
        } else {
            $this->vue->ecrireDonnee('message',"Echec des modifications");
        }
        $this->vue->afficher();
    }
    
    function ajoutStage(){
        $this->vue = new V_Vue("../vues/templates/template.inc.php");
        $this->vue->ecrireDonnee('titreVue', 'Ajouter un stage');
        // charger les coordonnées de l'utilisateur connecté depuis la BDD       
        $daoPers = new M_DaoPersonne();
        $daoAnneeScol = new M_DaoAnneeScol();
        $daoOrganisation = new M_DaoOrganisation();
        
        // Connextion aux BDD pour récupérer les données
        $daoPers->connecter();
        $utilisateur = $daoPers->getOneByLogin(MaSession::get('login'));
        $daoPers->deconnecter();
        
        $daoAnneeScol->connecter();
        $AnneeScol = $daoAnneeScol->getAll();
        $daoAnneeScol->deconnecter();
        
        $daoOrganisation->connecter();
        $organisation = $daoOrganisation->getAll();
        $daoOrganisation->deconnecter();
        
        // envoyer des données
        $this->vue->ecrireDonnee('utilisateur', $utilisateur);
        $this->vue->ecrireDonnee('anneescol', $AnneeScol);
        $this->vue->ecrireDonnee('organisation', $organisation);
        
        // transmettre le login        
        $this->vue->ecrireDonnee('loginAuthentification', MaSession::get('login'));
        
        // transmettre le vue centre
        $this->vue->ecrireDonnee('centre', "../vues/includes/utilisateur/centreAjouterStage.inc.php");
        
        // afficher la vue
        $this->vue->afficher();
    }
    
    function validerAjoutStage(){
        $this->vue = new V_Vue("../vues/templates/template.inc.php");
        $this->vue->ecrireDonnee('titreVue', "Validation de la création d'une personne");

        //récupération des données
        $Annee = $_POST['annee'];
        $Organisation = $_POST['orga'];
        $ville = $_POST['ville'];
        $dateD = $_POST['dateD'];
        $dateF = $_POST['dateF'];
        $dateV = $_POST['dateV'];
        
        $EleveNom = $_POST['eleveNom'];
        $ElevePrenom = $_POST['elevePrenom'];
        $ProfNom = $_POST['profNom'];
        $ProfPrenom = $_POST['profPrenom'];
        $MasterStageNom = $_POST['stageNom'];
        $MasterStagePrenom = $_POST['stagePrenom'];
        
        $divers = $_POST['divers'];
        $bilanTravaux = $_POST['bilanTravaux'];
        $ressourcesOutils = $_POST['RessourcesOutils'];
        $commantaire = $_POST['Commantaire'];
        $participationCCF = $_POST['ParticipationCCF'];
        
        // récupération des objets élèves, professeurs et maîtres de stages pour l'insertion d'un stage
        $daoPers = new M_DaoPersonne();
        $daoPers->connecter();
                
        $etudiant = $daoPers->getOneByNomPrenom($EleveNom, $ElevePrenom);
        //echo "étudiant";
        //var_dump($etudiant);
        $professeur = $daoPers->getOneByNomPrenom($ProfNom, $ProfPrenom);
        //echo "professeur";
        //var_dump($professeur);
        $maitreStage = $daoPers->getOneByNomPrenom($MasterStageNom, $MasterStagePrenom);
        //echo "maitre de stage";
        //var_dump($maitreStage);
        
        $daoPers->deconnecter();
        
        // récupération de l'objet AnneeScol pour l'insertion d'un stage
        $daoAnnee = new M_DaoAnneeScol();
        $daoAnnee->connecter();
        
        $annee = $daoAnnee->getOneByAnnee($Annee);
        //echo "année scolaire";
        //var_dump($annee);
        
        $daoAnnee->deconnecter();
        
        
        //récupération de l'objet Organisation pour l'insertion d'un stage
        $daoOrga = new M_DaoOrganisation();
        $daoOrga->connecter();
        
        $organisation = $daoOrga->getOneById($Organisation);
        //echo "organisation";
        //var_dump($organisation);
        
        //création d'un stage
        $unStage = new M_Stage(0, $annee, $etudiant, $professeur, $organisation, $maitreStage, $dateD, $dateF, $dateV, $ville, $divers, $bilanTravaux, $ressourcesOutils, $commantaire, $participationCCF);
        //echo "Le Stage";
        //var_dump($unStage);
        
        
        //insertion de la personne crée dans la base de données
        $daoStage = new M_DaoStage();
        $daoStage->connecter();
        $daoStage->insert($unStage);

        //si l'insertion a réussis, revois sur la page d'affichage sinon, renvoi un message d'erreur
        if ($daoStage) {
            $this->vue->ecrireDonnee('centre', "../vues/includes/utilisateur/centreValiderCreationPersonne.php");
        }
        
        $this->vue->ecrireDonnee('centre', "../vues/includes/utilisateur/centreValiderCreationStage.php");
        $this->vue->ecrireDonnee('loginAuthentification', MaSession::get("login"));
        $this->vue->afficher();
    }

}

?>