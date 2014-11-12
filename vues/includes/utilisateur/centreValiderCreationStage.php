<?php
    // récupération de tous les champs saisies
    $AnneeScol = $_POST['annee'];
    
    $Organisation = $_POST['orga'];
    $daoOrganisation = new M_DaoOrganisation();
    $daoOrganisation->connecter();
    $Lorganisation = $daoOrganisation->getOneById($Organisation);;
    $daoOrganisation->deconnecter();
    
    $Ville = $_POST['ville'];
    $DateDebut = $_POST['dateD'];
    $DateFin = $_POST['dateF'];
    $DateVisite = $_POST['dateV'];
    
    $EleveNom = $_POST['eleveNom'];
    $ElevePrenom = $_POST['elevePrenom'];
    $ProfNom = $_POST['profNom'];
    $ProfPrenom = $_POST['profPrenom'];
    $MasterStageNom = $_POST['stageNom'];
    $MasterStagePrenom = $_POST['stagePrenom'];
    
    $Divers = $_POST['divers'];
    $BilanTravaux = $_POST['bilanTravaux'];
    $RessourcesOutils = $_POST['RessourcesOutils'];
    $Commantaire = $_POST['Commantaire'];
    $ParticipationCCF = $_POST['ParticipationCCF'];
?>

<!-- Affichage des champs correpondant à la personne crée -->
<h1>Validation de la Création du Stage</h1>
<div class="affichageCreation" >
<label>Année Scolaire :</label>
<input type="text" value="<?php echo $AnneeScol; ?>" disabled><br/>
<label>Organisation :</label>
<input type="text" value="<?php echo $Lorganisation->getNomOrganisation(); ?>" disabled><br/>
<label>Ville :</label>
<input type="text" value="<?php echo $Ville; ?>" disabled><br/>
<label>Date de Début :</label>
<input type="text" value="<?php echo $DateDebut; ?>" disabled><br/>
<label>Date de Fin :</label>
<input type="text" value="<?php echo $DateFin; ?>" disabled><br/>
<label>Date de Visite :</label>
<input type="text" value="<?php echo $DateVisite; ?>" disabled><br/>
<label><strong>&Eacute;l&egrave;ve</strong></label>
<label>Nom</label>
<input type="text" value="<?php echo $EleveNom; ?>" disabled><br/>
<label>Prénom</label>
<input type="text" value="<?php echo $ElevePrenom; ?>" disabled><br/>
<label><strong>Professeur</strong></label>
<label>Nom</label>
<input type="text" value="<?php echo $ProfNom; ?>" disabled><br/>
<label>Prénom</label>
<input type="text" value="<?php echo $ProfPrenom; ?>" disabled><br/>
<label><strong>Maître de Stage</strong></label>
<label>Nom</label>
<input type="text" value="<?php echo $MasterStageNom; ?>" disabled><br/>
<label>Prénom</label>
<input type="text" value="<?php echo $MasterStagePrenom; ?>" disabled><br/>
<label></label>
<label>Divers</label>
<input type="text" value="<?php echo $Divers; ?>" disabled><br/>
<label>Bilan Travaux</label>
<input type="text" value="<?php echo $BilanTravaux; ?>" disabled><br/>
<label>Ressources Outils</label>
<input type="text" value="<?php echo $RessourcesOutils; ?>" disabled><br/>
<label>Commantaire</label>
<input type="text" value="<?php echo $Commantaire; ?>" disabled><br/>
<label>Participation au CCF</label>
<input type="text" value="<?php echo $ParticipationCCF; ?>" disabled><br/>