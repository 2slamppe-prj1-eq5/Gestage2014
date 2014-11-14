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

        $roleE = new M_Role(149, 4, "etudiant");
        $etudiant= new M_Personne(0, null, $roleE, "M.", "Hugo", "Victor", "0278901234", "vhugo@free.fr", "0678901234", "", "", "vhugo", "vh");

        $roleP = new M_Role(150, 3, "prof");
        $prof = new M_Personne(252, null, $roleP, "M.", "AA", "AAA", "0202020202", "a@free.fr", null, null, null, "aa", "aa");

        $roleM = new M_Role(150, 5, "maître de stage");
        $maitre = new M_Personne(322, null, $roleM, "M.", "BB", "BBB", "0202020202", "b@gmail.com", null, null, null, "bb", "bb");

        $organisation = new M_Organisation(3, "16", "nantes", "8 allée backo", "44000", "0202020202", null, "Sa", null);

        $annee = new M_AnneeScol('2013-2015');

        $stage = new M_Stage(28, $annee, $etudiant, $prof, $organisation, $maitre, '2014-05-26', '2014-06-27', '2014-06-20', 'Nantes', 'divers', 'bilan', 'ressource', 'commantaire', 'Oui');
        $dao->insert($stage);
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
