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

        $dao = new M_DaoAnneeScol();
        $dao->connecter();

        //Test de sélection de tous les enregistrements
        echo "<p>Test de sélection de tous les enregistrements</p>";
        $lesAnneeScols = $dao->getAll();
        var_dump($lesAnneeScols);

        //Test d'insertion
        echo "<p>Test d'insertion</p>";
        $AnneeScol = new M_AnneeScol("2015-2016");
        $dao->insert($AnneeScol);
        $anneeScol = $dao->getOneByAnnee("2015-2016");
        var_dump($anneeScol);
        
        /*

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
        var_dump($persLu);*/
        
        $dao->deconnecter();
        ?>
    </body>
</html>
