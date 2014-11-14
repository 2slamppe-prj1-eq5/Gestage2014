<?php

class M_DaoStage extends M_DaoGenerique {


    function __construct() {
        $this->nomTable = "STAGE";
        $this->nomClefPrimaire = "NUM_STAGE";
    }

    /**
     * Redéfinition de la méthode abstraite de M_DaoGenerique
     * Permet d'instancier un objet d'après les valeurs d'un enregistrement lu dans la base de données
     * @param tableau-associatif $unEnreg liste des valeurs des champs d'un enregistrement
     * @return objet :  instance de la classe métier, initialisée d'après les valeurs de l'enregistrement 
     */
    public function enregistrementVersObjet($enreg) {
        // on instancie l'objet organisation s'il y a lieu
        $l_Orga = null;
        if (isset($unEnregistrement['IDORGANISATION'])) {
            $daoOrganisation = new M_DaoOrganisation();
            $daoOrganisation->setPdo($this->pdo);
            $l_Orga = $daoOrganisation->getOneById($enreg['ID_ORGANISATION']);
        }
        
        // on instancie l'objet anneescol
        $anneeScol = null;
        if (isset($unEnregistrement['ANNEESCOL'])) {
            $daoAnneeScol = new M_DaoAnneeScol();
            $daoAnneeScol->setPdo($this->pdo);
            $anneeScol = $daoAnneeScol->getOneById($enreg['ANNEESCOL']);
        }
        
        $idEtudiant = null;
        $idProf =null;
        $idMaitreStage=null;
        if (isset($unEnregistrement['IDETUDIANT']) && isset($unEnregistrement['IDPROFESSEUR']) && isset($unEnregistrement['IDMAITRESTAGE'])){
            $daoPersonne = new M_DaoPersonne();
            $daoPersonne->setPdo($this->pdo);
            $idEtudiant = $daoPersonne->getOneByRole(4);
            $idProf = $daoPersonne->getOneByRole(3);
            $idMaitreStage = $daoPersonne->getOneByRole(5);
        }
        
        // on construit l'objet Stage 
        $retour = new M_Stage(
                $enreg['NUM_STAGE'],$anneeScol, $idEtudiant, $idProf, 
                $l_Orga, $idMaitreStage, $enreg['DATEDEBUT'], $enreg['DATEFIN'], 
                $enreg['DATEVISITESTAGE'], $enreg['VILLE'], $enreg['DIVERS'], $enreg['BILANTRAVAUX'], 
                $enreg['RESSOURCESOUTILS'], $enreg['COMMENTAIRES'], $enreg['PARTICIPATIONCCF']);
        return $retour;
    }

    /**
     * Prépare une liste de paramètres pour une requête SQL UPDATE ou INSERT
     * @param Object $objetMetier
     * @return array : tableau ordonné de valeurs
     */
    public function objetVersEnregistrement($objetMetier) {
        // construire un tableau des paramètres d'insertion ou de modification
        // l'ordre des valeurs est important : il correspond à celui des paramètres de la requête SQL
        $anneeScol = $objetMetier->getAnneeScol()->getAnneeScol();
        $idEtudiant = $objetMetier->getIdEtudiant()->getId();
        $idProfesseur = $objetMetier->getIdProfesseur()->getId();
        $idOrganisation = $objetMetier->getIdOrganisation()->getIdOrganisation();
        $idMaitreStage = $objetMetier->getIdMaitreStage()->getId();
        $retour = array(
            ':anneescol' => $anneeScol,
            ':idetudiant' => $idEtudiant,
            ':idprofesseur' => $idProfesseur,
            ':idorganisation' => $idOrganisation,
            ':idmaitrestage' => $idMaitreStage,
            ':datedebut' => $objetMetier->getDateDebut(),
            ':datefin'  => $objetMetier->getDateFin(),
            ':datevisitestage' => $objetMetier->getDateVisiteStage(),
            ':ville' => $objetMetier->getVille(),
            ':divers' => $objetMetier->getDivers(),
            ':bilantravaux' => $objetMetier->getBilanTravaux(),
            ':ressourceoutils' => $objetMetier->getRessourceOutils(),
            ':commentaires' => $objetMetier->getCommentaire(),
            ':participationccf'=> $objetMetier->getParticipationCCF()                
        );
        return $retour;
    }

    public function insert($objetMetier) {
        $retour = FALSE;
        try {
            // Requête textuelle paramétrée (paramètres nommés)
            $sql  = "INSERT INTO $this->nomTable (ANNEESCOL,IDETUDIANT,IDPROFESSEUR,IDORGANISATION,";
            $sql .= "IDMAITRESTAGE,DATEDEBUT,DATEFIN,DATEVISITESTAGE,VILLE,DIVERS,BILANTRAVAUX,";
            $sql .= "RESSOURCESOUTILS, COMMENTAIRES,PARTICIPATIONCCF) ";
            $sql .= "VALUES ('2013-2014','25', '3', '1',";
            $sql .= ":idmaitrestage, :datedebut, :datefin, :datevisitestage, :ville, :divers,";
            $sql .= ":bilantravaux :ressourceoutils, :commentaires, :participationccf)";
            // préparer la requête PDO
            $queryPrepare = $this->pdo->prepare($sql);
            // préparer la  liste des paramètres, avec l'identifiant en dernier
            $parametres = $this->objetVersEnregistrement($objetMetier);
            //var_dump($parametres);
            // exécuter la requête avec les valeurs des paramètres dans un tableau
            $retour = $queryPrepare->execute($parametres);
//            debug_query($sql, $parametres);
        } catch (PDOException $e) {
            echo get_class($this) . ' - ' . __METHOD__ . ' : ' . $e->getMessage();
        }
        return $retour;
    }

    public function update($idMetier, $objetMetier) {
        return FALSE;
    }
    
    /**
     * Lire tous les enregistrements d'une table
     * @return tableau-associatif d'objets : un tableau d'instances de la classe métier
     */
    function getAll() {
        $retour = null;
        // Requête textuelle
        $sql = "SELECT * FROM $this->nomTable";
        try {
            // préparer la requête PDO
            $queryPrepare = $this->pdo->prepare($sql);
            // exécuter la requête PDO
            if ($queryPrepare->execute()) {
                // si la requête réussit :
                // initialiser le tableau d'objets à retourner
                $retour = array();
                // pour chaque enregistrement retourné par la requête
                while ($enregistrement = $queryPrepare->fetch(PDO::FETCH_ASSOC)) {
                    // construir un objet métier correspondant
                    $unObjetMetier = $this->enregistrementVersObjet($enregistrement);
                    // ajouter l'objet au tableau
                    $retour[] = $unObjetMetier;
                }
            }
        } catch (PDOException $e) {
            echo get_class($this) . ' - ' . __METHOD__ . ' : ' . $e->getMessage();
        }
        return $retour;
    }

}