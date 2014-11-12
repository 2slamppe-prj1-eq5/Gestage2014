<?php
// récupération de tous les champs saisies
    

    $civilite = $_POST['civilite'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $mail = $_POST['mail'];    
    $numTel = $_POST['tel'];
    $mobile = $_POST['telP'];    
    $etudes = $_POST['etudes'];
    $formation = $_POST['formation'];  
    $login = $_POST['login'];
    $mdp = sha1($_POST['mdp']);
    $idRole = $_POST['role'];
    //récuperation de l'objet role
    $role = new M_Role(null, null, null);
    $daoRole = new M_DaoRole();
    $daoRole->connecter();
    $pdo = $daoRole->getPdo();
    $role=$daoRole->selectOne($idRole);
    
    $idSpecialite = $_POST['option'];   
    //recuperation de l'objet specialite
    $daoSpecialite = new M_DaoSpecialite();
    $daoSpecialite->connecter();
    $pdo = $daoSpecialite->getPdo();
    $specialite=$daoSpecialite->selectOne($idSpecialite);
    
?>

<!-- Affichage des champs correpondant à la personne crée -->
<div class="affichageCreation" >
<label for="tel">Role :</label>
<input type="text" name="telP" id="telP" value="<?php echo $role->getLibelle() ;?>" readonly></input><br/>
<label for="civilite">Civilite : </label>
<input type="text" name="nom" id="nom" value="<?php echo $civilite ; ?>" readonly></input><br/>
<label for="nom">Nom :</label>
<input type="text" name="nom" id="nom" value="<?php echo $nom ; ?>" readonly></input><br/>
<label for="prenom">Prénom : </label>
<input type="prenom" name="prenom" id="prenom" value="<?php echo $prenom ; ?>" readonly></input><br/>
<label for="mail">E-Mail :</label>
<input type="text" name="mail" id="mail" value="<?php echo $mail ; ?>" readonly></input><br/>
<label for="tel">Tel :</label>
<input type="text" name="tel" id="tel" value="<?php echo $numTel ; ?>" readonly></input><br/>
<label for="tel">Tel portable:</label>
<input type="text" name="telP" id="telP" value="<?php echo $mobile ?>" readonly></input><br/>
<label for="tel">Etudes :</label>
<input type="text" name="telP" id="telP" value="<?php echo $etudes ?>" readonly></input><br/>
<label for="tel">Formation :</label>
<input type="text" name="telP" id="telP" value="<?php echo $formation ?>" readonly></input><br/>
<label for="tel">Specilatié :</label>
<input type="text" name="telP" id="telP" value="<?php echo $specialite->getLibelleLong() ?>" readonly></input><br/>
<label for="tel">Login :</label>
<input type="text" name="telP" id="telP" value="<?php echo $login ?>" readonly></input><br/>
<label for="tel">Mot De Passe :</label>
<input type="password" name="telP" id="telP" value="<?php echo $mdp ?>" readonly></input><br/>
</div>