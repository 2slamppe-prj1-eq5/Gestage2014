<?php

class M_DaoRole extends M_DaoGenerique {


    function __construct() {
        $this->nomTable = "ROLE";
        $this->nomClefPrimaire = "IDROLE";
    }

    /**
     * Redéfinition de la méthode abstraite de M_DaoGenerique
     * Permet d'instancier un objet d'après les valeurs d'un enregistrement lu dans la base de données
     * @param tableau-associatif $unEnreg liste des valeurs des champs d'un enregistrement
     * @return objet :  instance de la classe métier, initialisée d'après les valeurs de l'enregistrement 
     */
    public function enregistrementVersObjet($enreg) {
        $retour = new M_Role($enreg['IDROLE'], $enreg['RANG'], $enreg['LIBELLE']);
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
        $retour = array(
            ':idRole' => $objetMetier->getIdRole(),
            ':rang' => $objetMetier->getRang(),
            ':libelle' => $objetMetier->getLibelle()
        );
        return $retour;
    }

    public function insert($objetMetier) {
        return FALSE;
    }

    public function update($idMetier, $objetMetier) {
        return FALSE;
    }
    
    //selection de tous les champs a partir de l'id
    public function selectOne($idRole) {
        $retour = null;
        try{
            //requete
            $sql = "SELECT * FROM $this->nomTable WHERE idrole=".$idRole;
            //préparer la requête PDO
            $queryPrepare = $this->pdo->prepare($sql);
            //execution de la  requete
            if($queryPrepare->execute(array(':id'=> $idRole))) {
                // si la requete marche
                $enregistrement = $queryPrepare->fetch(PDO::FETCH_ASSOC);
                $retour = $this->enregistrementVersObjet($enregistrement);
            }
            
        } catch (Exception $e) {
            echo get_class($this) . ' - ' . __METHOD__ . ' : ' . $e->getMessage();
        }
        return $retour;
    }
}