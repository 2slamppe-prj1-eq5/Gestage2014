<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>test DaoStage</title>
    </head>
    <body>
        <?php
        require_once("../includes/parametres.inc.php");
        require_once("../includes/fonctions.inc.php");

        $dao = new M_DaoStage();
        $dao->connecter();
        
        $daoOrganisation = new M_DaoOrganisation();
        $daoOrganisation->connecter();
        
        $daoPersonne = new M_DaoPersonne();
        $daoPersonne->connecter();

        //Test de sélection de tous les enregistrements
        echo "<p>Test de sélection de tous les enregistrements</p>";
        $lesStages = $dao->getAll();
        //var_dump($lesStages);
        
        //Test d'insertion
        echo "<p>Test d'insertion</p>";
        
        $etudiant= $daoPersonne->getOneById(25);;

        $prof = $daoPersonne->getOneById(2);

        $maitre = $daoPersonne->getOneById(3);

        $organisation = $daoOrganisation->getOneById(2);
        
        $annee = new M_AnneeScol('2013-2014');

        $stage = new M_Stage(28, $annee, $etudiant, $prof, $organisation, $maitre, '2014-05-26', '2014-06-27', '2014-06-20', 'Nantes', 'divers', 'bilan', 'ressource', 'commantaire', 'Oui');
        
        $dao->insert($stage);
        
        $id = $dao->getPdo()->lastInsertId();
        
        $StageAjoute = $dao->getOneById($id);
        var_dump($StageAjoute);
        

        //Test de modification
        echo "<p>Test de modification</p>";
 
        //Test de suppression
        echo "<p>Test de suppression</p>";
        $id = $dao->getPdo()->lastInsertId();
        echo "Suppression du stage d'ID : ".$id."<br/>";
        $dao->delete($id);
        $StageAjoute = $dao->getOneById($id);
        var_dump($StageAjoute);
        
        $dao->deconnecter();
        $daoOrganisation->deconnecter();
        $daoPersonne->deconnecter();
        ?>
    </body>
</html>
