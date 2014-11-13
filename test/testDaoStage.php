<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>test DaoAnneeScol</title>
    </head>
    <body>
        <?php
        require_once("../includes/parametres.inc.php");
        require_once("../includes/fonctions.inc.php");

        $dao = new M_DaoStage();
        $dao->connecter();

        //Test de sélection de tous les enregistrements
        echo "<p>Test de sélection de tous les enregistrements</p>";
        $lesStages = $dao->getAll();
        var_dump($lesStages);

        //Test d'insertion
       echo "<p>Test d'insertion</p>";
       
       $role = new M_Role(149, 4, "etudiant");
       $etudiant= new M_Personne(0, null, $role, "M.", "Hugo", "Victor", "0278901234", "vhugo@free.fr", "0678901234", "", "", "vhugo", "vh");
       $role = new M_Role(150, 3, "prof");
       $prof = new M_Personne(252, null, $role, "M.", "AA", "AAA", "0202020202", "a@free.fr", null, null, null, "aa", "aa");
       $org = new M_Organisation(3, "16", "nantes", "8 allée backo", "44000", "0202020202", null, "Sa", null);
       //$maitredestage = new M_Personne($id, $specialite, $role, $civilite, $nom, $prenom, $numTel, $mail, $mobile, $etudes, $formation, $login, $mdp)
       
       
        $Stage = new M_Stage('28', '2013-2014', 16, 2, 1, 3, '2014-05-26', '2014-06-27', '2014-06-20', 'Nantes', 'divers', 'bilan', 'ressource', 'commantaire', 'Oui');
        var_dump($Stage);
        $dao->insert($Stage);
        $StageAjoute = $dao->getOneById(28);
        var_dump($StageAjoute);
        
        die();

        //Test de modification
        echo "<p>Test de modification</p>";
       $role->setMail("victor.hugo@laposte.net");
        $role->setCivilite("Monsieur");
//        $id= $dao->getPdo()->lastInsertId();
        $enr = $dao->getPdo()->query('SELECT MAX(IDPERSONNE) FROM PERSONNE;')->fetch();
        $id= $enr[0];
        $dao->update($id,$role);
        $persLu = $dao->getOneByLogin('vhugo');
        var_dump($persLu);
 
        //Test de suppression
        echo "<p>Test de suppression</p>";
        $id = $persLu->getId();
        echo "Supprimer : ".$id."<br/>";
        $dao->delete($id);
        $persLu = $dao->getOneById($id);
        var_dump($persLu);
        
        $dao->deconnecter();
        ?>
    </body>
</html>
